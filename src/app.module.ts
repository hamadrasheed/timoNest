import { Module } from '@nestjs/common';
import { UserModule } from './api/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { models } from './models';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [ ...models ],
      logging: false,
    }),
    UserModule
  ],
})
export class AppModule {};
