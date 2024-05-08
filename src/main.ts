import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as httpLogs from 'morgan';
import helmet from 'helmet';

dotenv.config({ path: '.env' });

const port: number = +process.env.PORT ?? 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(httpLogs('dev'));
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();


  await app.listen(port);
}
bootstrap();
