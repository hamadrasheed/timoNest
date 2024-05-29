import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as httpLogs from 'morgan';
import helmet from 'helmet';
import { AllExceptionsFilter } from './middlewares/errorHandler';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config({ path: '.env' });

const port: number  = +process.env.PORT ?? 4000;
const environment: string = process.env.NODE_ENV || 'local';
const keepNestLogging: any = environment == 'local' ? true : false;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: keepNestLogging,
  });

  app.enableCors();

  const config = new DocumentBuilder()
  .setTitle('Ibus Backend')
  .setVersion('1.0')
  .addServer(`http://localhost:${port}/`, 'Local environment')
  .build();
  
  app.setGlobalPrefix('api');
  app.use(httpLogs('dev'));
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();

  app.useGlobalFilters(new AllExceptionsFilter());


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(port);
  console.log('App is running at http://localhost:%d in %s mode', port, environment);
}
bootstrap();
