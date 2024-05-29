import { Injectable } from '@nestjs/common';
import * as  bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { generateMessages, GenerateMsgI } from '../../utils/generateMessage';
import { InjectModel } from '@nestjs/sequelize';
import * as models from '../../models';
import { Helper } from '../../shared/helper';
import { Op, Sequelize, Transaction } from 'sequelize';
import { sendEmail } from '../../shared/emailGenerator';
import { GenericSendEmailDataI } from 'src/interfaces';
import { constantData } from '../../shared/constants';
import { 
    SignUpDto, 
    SignInDto, 
    ResetPasswordDto, 
    ForgotPasswordDto, 
    ResetForgotPasswordDto, 
    VerifySignUpOtpDto,
    ResendOtpDto
} from '../../dto/users/user.dto';

@Injectable()
export class UserService extends Helper {

    
    constructor(
        @InjectModel(models.users) private readonly userRepo: typeof models.users,
        @InjectModel(models.roles) private readonly roleRepo: typeof models.roles,
        @InjectModel(models.userOtpInfo) private readonly userOtpInfoRepo: typeof models.userOtpInfo,
    ) {
        super()
    }

    public signUp = async (data: SignUpDto) => {

        try {
            // starting transactions as we need to update/insert in more than one tables
            const dbTransaction: Transaction = await this.userRepo.sequelize.transaction();

            try {
                const {
                    userName,
                    email,
                    password,
                    roleSlug,
                } = data;
    
                const doesEmailExits: models.usersI = this.shallowCopy(await this.userRepo.findOne(
                    {
                        
                        where: {
                            [Op.or]: [
                                {
                                    email: email,
                                },
                                {
                                    userName: userName
                                }
                            ],
                            deletedAt: null
    
                            
                        },
                        attributes: ['id', 'email', 'userName']
                    }
                ));
    
                
                if (doesEmailExits && Object.keys(doesEmailExits).length) {
                    
                    const duplicateUserkey: string = doesEmailExits.email === email ? 'email' : 'userName';
                    const errorMessage: GenerateMsgI = generateMessages('USER_EXISTS');
                    
                    // Error message modified with dynamic key, email or userName
                    errorMessage.message = `${errorMessage.message} with this ${duplicateUserkey}`;
                    throw errorMessage; 
                }
    
                const roles: models.rolesI = this.shallowCopy(await this.roleRepo.findOne(
                    {
                        where: {
                            slug: roleSlug,
                            deletedAt: null
                        },
                        attributes: ['id']
                    }
                ));
    
                if (!roles || !Object.keys(roles).length) {
                    throw generateMessages('INVALID_ROLE');
                }
    
                const bcryptPassword: string = await bcrypt.hash(password, 1);

                const createdUser = this.shallowCopy(await this.userRepo.create(
                    {
                        email,
                        userName,
                        password: bcryptPassword,
                        roleId: roles.id,
                        roleSlug: roleSlug,
                        isActive: false, // mean user hasn't verified otp code yet
                    },
                    {
                        transaction: dbTransaction,
                    }
                ));
    
                const otp: number = this.generateFourDigitRandomNumber();
                const currentDate: Date = new Date();

                await this.userOtpInfoRepo.create(
                    {
                        otp: otp,
                        userId: createdUser.id,
                        otpType: constantData.signUpOTP,
                        updatedAt: currentDate
                    },
                    {
                        transaction: dbTransaction,
                    }
                );

                const formattedOTP: string = this.formatFourDigitRandomNumber(otp);
                
                const sentEmailConfig: GenericSendEmailDataI = {
                    emailTo: email,
                    emailFrom: `"IBus" <${process.env.EMAIL_USER}>`,
                    emailSubject: 'Verify email',
                    emailText: `You OTP code is ${formattedOTP}`, // For now sending token in Email, will replace with anchor tag once frontend page is provided where we need to reroute
                }
    
                try {
                    // sending email in async manner, will change if needed!
                    sendEmail(sentEmailConfig);
                } catch (error) {
                    console.log('error in sending otp email', error);
                }
    
                await dbTransaction.commit();
    
                return 'An OTP has sent to the email which is valid for only 10 minutes, Please enter OTP to confirm your account!'
    
            } catch (error) {
                await dbTransaction.rollback();
                throw error;
            }
            
        } catch (error) {
            throw error;
        }

    }

    public signIn = async (data: SignInDto) => {
        try {

            const {
                userName,
                password,
                roleSlug,
            } = data;

            const signInUser: models.usersI = this.shallowCopy(await this.userRepo.findOne(
                { 
                    where: {
                        userName,
                        roleSlug
                    }
                }));
            
            if (!signInUser || !Object.keys(signInUser).length) {
                throw generateMessages('USERNAME_NOT_FOUND');
            }
            
            const { password: userPassword } = signInUser;
            
            const bcryptedPassword: boolean = await bcrypt.compare(password, userPassword);

            if (!bcryptedPassword) {
                throw generateMessages('WRONG_PASSWORD');
            }

            const secretKey: string = process.env.JWT_SECRET_KEY;

            const userToken: string = jwt.sign(
                {
                    id: signInUser.id,
                },
                secretKey,
                {
                    expiresIn: '24h',
                }
            );

            delete signInUser.password;

            const response = {
                ...signInUser,
                  token: userToken
            };

            return {
                ...response
            };

        } catch (error) {
            throw error;
        }

    }

    public resetPassword = async (data: ResetPasswordDto) => {
        try {

            const {
                userId,
                oldPassword,
                newPassword,
            } = data;

            const signInUser: models.usersI = this.shallowCopy(await this.userRepo.findByPk(userId, {
                attributes: ['id', 'password']
            }));

            if (!signInUser || !Object.keys(signInUser).length) {
                throw generateMessages('UNKOWN_USER');
            }

            const { password: passwordFromDB } = signInUser;

            const bcryptedPassword: boolean = await bcrypt.compare(oldPassword, passwordFromDB);

            if (!bcryptedPassword) {
                throw generateMessages('WRONG_PASSWORD');
            }
            // Check if newPassword is different from oldPassword
            if (oldPassword === newPassword) {
                throw generateMessages('OLD_AND_NEW_PASSWORD_SAME');
            }

            const bcryptNewPassword: string = await bcrypt.hash(newPassword, 1);
            await this.userRepo.update(
                {
                    password: bcryptNewPassword
                },
                {
                    where: { id: userId }
                }
            );

            return `User's password updated successfully!`;

        } catch (error) {
            throw error;
        }

    }

    // User will send email 
    public forgotPassword = async (data: ForgotPasswordDto) => {
        try {

            const {
                email,
            } = data;

            const doesEmailExits: models.usersI = this.shallowCopy(await this.userRepo.findOne(
                {
                    
                    where: {
                        email: email,
                        deletedAt: null
                    },
                    attributes: ['id']
                }
            ));

            if (!doesEmailExits || !Object.keys(doesEmailExits).length) {
                
                const duplicateUserkey: string = 'email';
                const errorMessage: GenerateMsgI = generateMessages('EMAIL_NOT_FOUND');                
                throw errorMessage; 
            }

            const existingRedoesEmailExitssetEntryForUser: models.userOtpInfoI = this.shallowCopy( await this.userOtpInfoRepo.findOne({
                where: {
                    userId: doesEmailExits.id,
                    otpType: constantData.forgotPasswordOTP
                },
                attributes: ['id']
            }));

            const userOtp: number = this.generateFourDigitRandomNumber();
            const formattedOTP: string = this.formatFourDigitRandomNumber(userOtp);
            
            const currentDate: Date = new Date();

            // if no entry found in resetPasswordInfo model, we will create a new row else update that row
            if (!existingRedoesEmailExitssetEntryForUser || !Object.keys(existingRedoesEmailExitssetEntryForUser).length) {
                
                await this.userOtpInfoRepo.create({
                    userId: doesEmailExits.id,
                    otp: userOtp,
                    otpType: constantData.forgotPasswordOTP,
                    updatedAt: currentDate
                });

            } else {
                await this.userOtpInfoRepo.update(
                    {
                        otp: userOtp,
                        updatedAt: currentDate
                    },
                    {
                        where: {
                            userId: doesEmailExits.id,
                            otpType: constantData.forgotPasswordOTP,
                        }
                    }
                )
            }

            const sentEmailConfig: GenericSendEmailDataI = {
                emailTo: email,
                emailFrom: `"IBus" <${process.env.EMAIL_USER}>`,
                emailSubject: 'Reset Password',
                emailText: `You password reset OTP is ${formattedOTP}`, 
            }

            // sending email in async manner, will change if needed!
            sendEmail(sentEmailConfig);

            return `A OTP has been sent to your email, its valid for only 10 minutes.`;

        } catch (error) {
            throw error;
        }

    }

    // validate the OTP, which was created in forgotPassword api,
    public resetForgotPassword = async (data: ResetForgotPasswordDto) => {
        try {
            // starting transactions as we need to update/insert in more than one tables
            const dbTransaction: Transaction = await this.userRepo.sequelize.transaction();
            
            try {
                const {
                    email,
                    otp,
                    newPassword,
                } = data;

                const user: models.usersI = this.shallowCopy(await this.userRepo.findOne(
                    {
                        where: {
                            email: email,
                            deletedAt: null
                        },
                        attributes: ['id']
                    }
                ));

                if (!user || !Object.keys(user).length) {        
                    throw generateMessages('EMAIL_NOT_FOUND');                
                }
    
                const userResetPasswordInfo: models.userOtpInfoI = this.shallowCopy( await this.userOtpInfoRepo.findOne({
                    where: {
                        otp,
                        userId: user.id,
                        otpType: constantData.forgotPasswordOTP
                    },
                    attributes: ['id', 'userId', 'updatedAt']
                }));

                // If not exists means user already reset password once with this token
                if (!userResetPasswordInfo || !Object.keys(userResetPasswordInfo).length) {
                    throw generateMessages('INVALID_OTP')
                }                

                // return false if OTP is created more than 10 minutes ago
                const isOTPValidWithTime: boolean = this.validateDateIsOld(userResetPasswordInfo.updatedAt, 10);
                
                if(!isOTPValidWithTime) {
                    
                    await this.userOtpInfoRepo.destroy(
                        {
                            where: { userId: userResetPasswordInfo.id },
                        },
                    );
                    throw generateMessages('OTP_EXPIRED');
                
                }
                    
                const bcryptPassword: string = await bcrypt.hash(newPassword, 1);
                await this.userRepo.update(
                    {
                        password: bcryptPassword
                    },
                    {
                        where: { id: userResetPasswordInfo.userId },
                        transaction: dbTransaction
                    }
                );

                // will hard delete as we don't need to increase size of table unless needed
                await this.userOtpInfoRepo.destroy(
                    {
                        where: { id: userResetPasswordInfo.id },
                        transaction: dbTransaction
                    },
                );

                await dbTransaction.commit();
                return 'Password updated successfully!';

            } catch (error) {
                await dbTransaction.rollback();
                throw error;
            }  
        } catch (error) {
            throw error;
        }
    }

    // validate otp and verify user in our db
    public verifySignUpOtp = async (data: VerifySignUpOtpDto) => {

        try {
            
            const dbTransaction: Transaction = await this.userRepo.sequelize.transaction();
            
            try {
    
                const {
                    email,
                    otp
                } = data;
        
                const user: models.usersI = this.shallowCopy(await this.userRepo.findOne(
                    {
                        where: {
                            email: email,
                            deletedAt: null
                        },
                        attributes: ['id']
                    }
                ));
        
                if (!user || !Object.keys(user).length) {        
                    throw generateMessages('EMAIL_NOT_FOUND');                
                }
        
                const userOtpInfo: models.userOtpInfoI = this.shallowCopy( await this.userOtpInfoRepo.findOne({
                    where: {
                        otp,
                        userId: user.id,
                        otpType: constantData.signUpOTP
                    },
                    attributes: ['id', 'userId', 'updatedAt']
                }));
        
                // If not exists means user already reset password once with this token
                if (!userOtpInfo || !Object.keys(userOtpInfo).length) {
                    throw generateMessages('INVALID_OTP')
                }
        
                // return false if OTP is created more than 10 minutes ago
                const isOTPValidWithTime: boolean = this.validateDateIsOld(userOtpInfo.updatedAt, 10);
        
                if(!isOTPValidWithTime) {
                    
                    await this.userOtpInfoRepo.destroy(
                        {
                            where: { id: userOtpInfo.id },
                        },
                    );
    
                    throw generateMessages('OTP_EXPIRED');
                
                }
    
                await this.userRepo.update(
                    {
                        isActive: true
                    },
                    {
                        where: { id: user.id },
                        transaction: dbTransaction
                    }
                );
    
                // will hard delete as we don't need to increase size of table unless needed
                await this.userOtpInfoRepo.destroy(
                    {
                        where: { id: userOtpInfo.id },
                        transaction: dbTransaction
                    },
                );
            
                await dbTransaction.commit();
                
                return 'User is verified!';

            } catch (error) {
                await dbTransaction.rollback();
                throw error;
            }
        } catch (error) {
            throw error;
        }



    }

    // resend OTP for sign-up or forgot password
    public resendUserOtp = async (data: ResendOtpDto) => {
        try {
            const {
                email,
                otpType
            } = data;

            const user: models.usersI = this.shallowCopy(await this.userRepo.findOne(
                {
                    where: {
                        email: email,
                        deletedAt: null
                    },
                    attributes: ['id']
                }
            ));
    
            if (!user || !Object.keys(user).length) {        
                throw generateMessages('EMAIL_NOT_FOUND');                
            }


            const userOtpExists: models.userOtpInfoI = this.shallowCopy( await this.userOtpInfoRepo.findOne({
                where: {
                    userId: user.id,
                    otpType: otpType,
                },
                attributes: ['id']
            }));

            const userOtp: number = this.generateFourDigitRandomNumber();
            const formattedOTP: string = this.formatFourDigitRandomNumber(userOtp);
            
            const currentDate: Date = new Date();

            // if no entry found in resetPasswordInfo model, we will create a new row else update that row
            if (!userOtpExists || !Object.keys(userOtpExists).length) {
                
                await this.userOtpInfoRepo.create({
                    userId: user.id,
                    otp: userOtp,
                    otpType: otpType,
                    updatedAt: currentDate

                });

            } else {
                await this.userOtpInfoRepo.update(
                    {
                        otp: userOtp,
                        updatedAt: currentDate
                    },
                    {
                        where: {
                            userId: user.id,
                            otpType: constantData.forgotPasswordOTP
                        }
                    }
                )
            }

            const sentEmailConfig: GenericSendEmailDataI = {
                emailTo: email,
                emailFrom: `"IBus" <${process.env.EMAIL_USER}>`,
                emailSubject: `Your ${otpType} OTP`,
                emailText: `You OTP code is ${formattedOTP}`, // For now sending token in Email, will replace with anchor tag once frontend page is provided where we need to reroute
            }

            try {
                // sending email in async manner, will change if needed!
                sendEmail(sentEmailConfig);
            } catch (error) {
                console.log('error in sending otp email', error);
            }

            return 'An OTP has sent to the email which is valid for only 10 minutes!'


        } catch (error) {
            throw error;
        }
    }



}
