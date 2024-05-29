"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateMessage_1 = require("../../utils/generateMessage");
const sequelize_1 = require("@nestjs/sequelize");
const models = require("../../models");
const helper_1 = require("../../shared/helper");
const sequelize_2 = require("sequelize");
const emailGenerator_1 = require("../../shared/emailGenerator");
const constants_1 = require("../../shared/constants");
let UserService = class UserService extends helper_1.Helper {
    constructor(userRepo, roleRepo, userOtpInfoRepo) {
        super();
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.userOtpInfoRepo = userOtpInfoRepo;
        this.signUp = async (data) => {
            try {
                const dbTransaction = await this.userRepo.sequelize.transaction();
                try {
                    const { userName, email, password, roleSlug, } = data;
                    const doesEmailExits = this.shallowCopy(await this.userRepo.findOne({
                        where: {
                            [sequelize_2.Op.or]: [
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
                    }));
                    if (doesEmailExits && Object.keys(doesEmailExits).length) {
                        const duplicateUserkey = doesEmailExits.email === email ? 'email' : 'userName';
                        const errorMessage = (0, generateMessage_1.generateMessages)('USER_EXISTS');
                        errorMessage.message = `${errorMessage.message} with this ${duplicateUserkey}`;
                        throw errorMessage;
                    }
                    const roles = this.shallowCopy(await this.roleRepo.findOne({
                        where: {
                            slug: roleSlug,
                            deletedAt: null
                        },
                        attributes: ['id']
                    }));
                    if (!roles || !Object.keys(roles).length) {
                        throw (0, generateMessage_1.generateMessages)('INVALID_ROLE');
                    }
                    const bcryptPassword = await bcrypt.hash(password, 1);
                    const createdUser = this.shallowCopy(await this.userRepo.create({
                        email,
                        userName,
                        password: bcryptPassword,
                        roleId: roles.id,
                        roleSlug: roleSlug,
                        isActive: false,
                    }, {
                        transaction: dbTransaction,
                    }));
                    const otp = this.generateFourDigitRandomNumber();
                    const currentDate = new Date();
                    await this.userOtpInfoRepo.create({
                        otp: otp,
                        userId: createdUser.id,
                        otpType: constants_1.constantData.signUpOTP,
                        updatedAt: currentDate
                    }, {
                        transaction: dbTransaction,
                    });
                    const formattedOTP = this.formatFourDigitRandomNumber(otp);
                    const sentEmailConfig = {
                        emailTo: email,
                        emailFrom: `"IBus" <${process.env.EMAIL_USER}>`,
                        emailSubject: 'Verify email',
                        emailText: `You OTP code is ${formattedOTP}`,
                    };
                    try {
                        (0, emailGenerator_1.sendEmail)(sentEmailConfig);
                    }
                    catch (error) {
                        console.log('error in sending otp email', error);
                    }
                    await dbTransaction.commit();
                    return 'An OTP has sent to the email which is valid for only 10 minutes, Please enter OTP to confirm your account!';
                }
                catch (error) {
                    await dbTransaction.rollback();
                    throw error;
                }
            }
            catch (error) {
                throw error;
            }
        };
        this.signIn = async (data) => {
            try {
                const { userName, password, roleSlug, } = data;
                const signInUser = this.shallowCopy(await this.userRepo.findOne({
                    where: {
                        userName,
                        roleSlug
                    }
                }));
                if (!signInUser || !Object.keys(signInUser).length) {
                    throw (0, generateMessage_1.generateMessages)('USERNAME_NOT_FOUND');
                }
                const { password: userPassword } = signInUser;
                const bcryptedPassword = await bcrypt.compare(password, userPassword);
                if (!bcryptedPassword) {
                    throw (0, generateMessage_1.generateMessages)('WRONG_PASSWORD');
                }
                const secretKey = process.env.JWT_SECRET_KEY;
                const userToken = jwt.sign({
                    id: signInUser.id,
                }, secretKey, {
                    expiresIn: '24h',
                });
                delete signInUser.password;
                const response = {
                    ...signInUser,
                    token: userToken
                };
                return {
                    ...response
                };
            }
            catch (error) {
                throw error;
            }
        };
        this.resetPassword = async (data) => {
            try {
                const { userId, oldPassword, newPassword, } = data;
                const signInUser = this.shallowCopy(await this.userRepo.findByPk(userId, {
                    attributes: ['id', 'password']
                }));
                if (!signInUser || !Object.keys(signInUser).length) {
                    throw (0, generateMessage_1.generateMessages)('UNKOWN_USER');
                }
                const { password: passwordFromDB } = signInUser;
                const bcryptedPassword = await bcrypt.compare(oldPassword, passwordFromDB);
                if (!bcryptedPassword) {
                    throw (0, generateMessage_1.generateMessages)('WRONG_PASSWORD');
                }
                if (oldPassword === newPassword) {
                    throw (0, generateMessage_1.generateMessages)('OLD_AND_NEW_PASSWORD_SAME');
                }
                const bcryptNewPassword = await bcrypt.hash(newPassword, 1);
                await this.userRepo.update({
                    password: bcryptNewPassword
                }, {
                    where: { id: userId }
                });
                return `User's password updated successfully!`;
            }
            catch (error) {
                throw error;
            }
        };
        this.forgotPassword = async (data) => {
            try {
                const { email, } = data;
                const doesEmailExits = this.shallowCopy(await this.userRepo.findOne({
                    where: {
                        email: email,
                        deletedAt: null
                    },
                    attributes: ['id']
                }));
                if (!doesEmailExits || !Object.keys(doesEmailExits).length) {
                    const duplicateUserkey = 'email';
                    const errorMessage = (0, generateMessage_1.generateMessages)('EMAIL_NOT_FOUND');
                    throw errorMessage;
                }
                const existingRedoesEmailExitssetEntryForUser = this.shallowCopy(await this.userOtpInfoRepo.findOne({
                    where: {
                        userId: doesEmailExits.id,
                        otpType: constants_1.constantData.forgotPasswordOTP
                    },
                    attributes: ['id']
                }));
                const userOtp = this.generateFourDigitRandomNumber();
                const formattedOTP = this.formatFourDigitRandomNumber(userOtp);
                const currentDate = new Date();
                if (!existingRedoesEmailExitssetEntryForUser || !Object.keys(existingRedoesEmailExitssetEntryForUser).length) {
                    await this.userOtpInfoRepo.create({
                        userId: doesEmailExits.id,
                        otp: userOtp,
                        otpType: constants_1.constantData.forgotPasswordOTP,
                        updatedAt: currentDate
                    });
                }
                else {
                    await this.userOtpInfoRepo.update({
                        otp: userOtp,
                        updatedAt: currentDate
                    }, {
                        where: {
                            userId: doesEmailExits.id,
                            otpType: constants_1.constantData.forgotPasswordOTP,
                        }
                    });
                }
                const sentEmailConfig = {
                    emailTo: email,
                    emailFrom: `"IBus" <${process.env.EMAIL_USER}>`,
                    emailSubject: 'Reset Password',
                    emailText: `You password reset OTP is ${formattedOTP}`,
                };
                (0, emailGenerator_1.sendEmail)(sentEmailConfig);
                return `A OTP has been sent to your email, its valid for only 10 minutes.`;
            }
            catch (error) {
                throw error;
            }
        };
        this.resetForgotPassword = async (data) => {
            try {
                const dbTransaction = await this.userRepo.sequelize.transaction();
                try {
                    const { email, otp, newPassword, } = data;
                    const user = this.shallowCopy(await this.userRepo.findOne({
                        where: {
                            email: email,
                            deletedAt: null
                        },
                        attributes: ['id']
                    }));
                    if (!user || !Object.keys(user).length) {
                        throw (0, generateMessage_1.generateMessages)('EMAIL_NOT_FOUND');
                    }
                    const userResetPasswordInfo = this.shallowCopy(await this.userOtpInfoRepo.findOne({
                        where: {
                            otp,
                            userId: user.id,
                            otpType: constants_1.constantData.forgotPasswordOTP
                        },
                        attributes: ['id', 'userId', 'updatedAt']
                    }));
                    if (!userResetPasswordInfo || !Object.keys(userResetPasswordInfo).length) {
                        throw (0, generateMessage_1.generateMessages)('INVALID_OTP');
                    }
                    const isOTPValidWithTime = this.validateDateIsOld(userResetPasswordInfo.updatedAt, 10);
                    if (!isOTPValidWithTime) {
                        await this.userOtpInfoRepo.destroy({
                            where: { userId: userResetPasswordInfo.id },
                        });
                        throw (0, generateMessage_1.generateMessages)('OTP_EXPIRED');
                    }
                    const bcryptPassword = await bcrypt.hash(newPassword, 1);
                    await this.userRepo.update({
                        password: bcryptPassword
                    }, {
                        where: { id: userResetPasswordInfo.userId },
                        transaction: dbTransaction
                    });
                    await this.userOtpInfoRepo.destroy({
                        where: { id: userResetPasswordInfo.id },
                        transaction: dbTransaction
                    });
                    await dbTransaction.commit();
                    return 'Password updated successfully!';
                }
                catch (error) {
                    await dbTransaction.rollback();
                    throw error;
                }
            }
            catch (error) {
                throw error;
            }
        };
        this.verifySignUpOtp = async (data) => {
            try {
                const dbTransaction = await this.userRepo.sequelize.transaction();
                try {
                    const { email, otp } = data;
                    const user = this.shallowCopy(await this.userRepo.findOne({
                        where: {
                            email: email,
                            deletedAt: null
                        },
                        attributes: ['id']
                    }));
                    if (!user || !Object.keys(user).length) {
                        throw (0, generateMessage_1.generateMessages)('EMAIL_NOT_FOUND');
                    }
                    const userOtpInfo = this.shallowCopy(await this.userOtpInfoRepo.findOne({
                        where: {
                            otp,
                            userId: user.id,
                            otpType: constants_1.constantData.signUpOTP
                        },
                        attributes: ['id', 'userId', 'updatedAt']
                    }));
                    if (!userOtpInfo || !Object.keys(userOtpInfo).length) {
                        throw (0, generateMessage_1.generateMessages)('INVALID_OTP');
                    }
                    const isOTPValidWithTime = this.validateDateIsOld(userOtpInfo.updatedAt, 10);
                    if (!isOTPValidWithTime) {
                        await this.userOtpInfoRepo.destroy({
                            where: { id: userOtpInfo.id },
                        });
                        throw (0, generateMessage_1.generateMessages)('OTP_EXPIRED');
                    }
                    await this.userRepo.update({
                        isActive: true
                    }, {
                        where: { id: user.id },
                        transaction: dbTransaction
                    });
                    await this.userOtpInfoRepo.destroy({
                        where: { id: userOtpInfo.id },
                        transaction: dbTransaction
                    });
                    await dbTransaction.commit();
                    return 'User is verified!';
                }
                catch (error) {
                    await dbTransaction.rollback();
                    throw error;
                }
            }
            catch (error) {
                throw error;
            }
        };
        this.resendUserOtp = async (data) => {
            try {
                const { email, otpType } = data;
                const user = this.shallowCopy(await this.userRepo.findOne({
                    where: {
                        email: email,
                        deletedAt: null
                    },
                    attributes: ['id']
                }));
                if (!user || !Object.keys(user).length) {
                    throw (0, generateMessage_1.generateMessages)('EMAIL_NOT_FOUND');
                }
                const userOtpExists = this.shallowCopy(await this.userOtpInfoRepo.findOne({
                    where: {
                        userId: user.id,
                        otpType: otpType,
                    },
                    attributes: ['id']
                }));
                const userOtp = this.generateFourDigitRandomNumber();
                const formattedOTP = this.formatFourDigitRandomNumber(userOtp);
                const currentDate = new Date();
                if (!userOtpExists || !Object.keys(userOtpExists).length) {
                    await this.userOtpInfoRepo.create({
                        userId: user.id,
                        otp: userOtp,
                        otpType: otpType,
                        updatedAt: currentDate
                    });
                }
                else {
                    await this.userOtpInfoRepo.update({
                        otp: userOtp,
                        updatedAt: currentDate
                    }, {
                        where: {
                            userId: user.id,
                            otpType: constants_1.constantData.forgotPasswordOTP
                        }
                    });
                }
                const sentEmailConfig = {
                    emailTo: email,
                    emailFrom: `"IBus" <${process.env.EMAIL_USER}>`,
                    emailSubject: `Your ${otpType} OTP`,
                    emailText: `You OTP code is ${formattedOTP}`,
                };
                try {
                    (0, emailGenerator_1.sendEmail)(sentEmailConfig);
                }
                catch (error) {
                    console.log('error in sending otp email', error);
                }
                return 'An OTP has sent to the email which is valid for only 10 minutes!';
            }
            catch (error) {
                throw error;
            }
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(models.users)),
    __param(1, (0, sequelize_1.InjectModel)(models.roles)),
    __param(2, (0, sequelize_1.InjectModel)(models.userOtpInfo)),
    __metadata("design:paramtypes", [Object, Object, Object])
], UserService);
//# sourceMappingURL=user.service.js.map