import { Injectable } from '@nestjs/common';
import { SignUpDto, SignInDto } from 'src/dto/users/user.dto';
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
    ) {
        super()
    }

    public signUp = async (data: SignUpDto) => {

        try {
            const {
                userName,
                email,
                password,
                roleId,
            } = data;
    
            const doesEmailExits: models.usersI = this.shallowCopy(await this.userRepo.findOne(
                {
                    where: {
                        email: email,
                        deletedAt: null
                    }
                }
            ));

            if (doesEmailExits && Object.keys(doesEmailExits).length) {
                throw generateMessages('EMAIL_EXISTS');
            }

            const bcryptPassword: string = await bcrypt.hash(password, 1);
    
            const newUser = this.shallowCopy(await this.userRepo.create(
                {
                    email,
                    userName,
                    password: bcryptPassword,
                    roleId,
                    roleSlug: 'admin', // will get this after query from DB for table of admin once admin table is created
                }
            ));

            const secretKey: string = process.env.JWT_SECRET_KEY;

            const userToken: string = jwt.sign(
                {
                    id: newUser.id,
                },
                secretKey,
                {
                    expiresIn: '24h',
                }
            );

            delete newUser.password;

            const response = {
                ...newUser,
                  token: userToken
            };

            return {
                ...response
            };

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


}
