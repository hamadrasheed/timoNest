import { Module, NestModule, RequestMethod, MiddlewareConsumer, Inject, OnApplicationBootstrap } from '@nestjs/common';
import { UserModule } from './api/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import * as cors from 'cors';
import { models } from './models';
import { authenticate } from './middlewares/authenticate';
import { Sequelize } from 'sequelize-typescript';

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
export class AppModule implements NestModule, OnApplicationBootstrap {
  constructor(private readonly sequelize: Sequelize) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors(), authenticate)
      .exclude(
        { path: 'user/login', method: RequestMethod.POST },
        { path: 'user/sign-up', method: RequestMethod.POST },
        { path: 'user/activate-user', method: RequestMethod.PUT },
        { path: 'user/resend-otp', method: RequestMethod.POST },
        { path: 'user/forgot-password', method: RequestMethod.POST },
        { path: 'user/reset-forgot-password', method: RequestMethod.PUT },
      )
      .forRoutes({
        path: '*', method: RequestMethod.ALL,
      });
  }

  async onApplicationBootstrap() {
    try {
      await this.sequelize.authenticate();
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}
