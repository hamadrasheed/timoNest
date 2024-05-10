import { Injectable } from '@nestjs/common';
import { SignUpDto, SignInDto, ResetPasswordDto } from 'src/dto/users/user.dto';
import * as  bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { generateMessages } from 'src/utils/generateMessage';
import { InjectModel } from '@nestjs/sequelize';
import * as models from '../../models';
import { Helper } from 'src/shared/helper';

@Injectable()
export class UserService extends Helper {

    constructor(
      @InjectModel(models.users) private readonly userRepo: typeof models.users,
      @InjectModel(models.roles) private readonly roleRepo: typeof models.roles,
    ) {
        super()
    }

    public signUp = async (data: SignUpDto) => {

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
                        email: email,
                        deletedAt: null
                    },
                    attributes: ['id']
                }
            ));

            if (doesEmailExits && Object.keys(doesEmailExits).length) {
                throw generateMessages('EMAIL_EXISTS');
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
    
            await this.userRepo.create(
                {
                    email,
                    userName,
                    password: bcryptPassword,
                    roleId: roles.id,
                    roleSlug: roleSlug
                }
            );

            return 'User created successfully!'

        } catch (error) {
            throw error
        }

    }

    public signIn = async (data: SignInDto) => {
        try {

            const {
                email,
                password,
                roleSlug,
            } = data;

            const signInUser: models.usersI = this.shallowCopy(await this.userRepo.findOne(
                { 
                    where: {
                        email: email,
                        roleSlug
                    }
                }));
            
            if (!signInUser || !Object.keys(signInUser).length) {
                throw generateMessages('EMAIL_NOT_FOUND');
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

            await this.userRepo.update(
                {
                    password: newPassword
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


}
