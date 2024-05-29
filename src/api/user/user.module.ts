import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { roles, users, userOtpInfo } from '../../models';

@Module({
    imports: [
        SequelizeModule.forFeature(
            [
                users,
                roles,
                userOtpInfo,
            ]
        ),
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
