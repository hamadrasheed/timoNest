import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorResponse = {
      statusCode: exception?.status || 406,
      message: exception?.response?.message ? exception?.response?.message : exception?.parent?.sqlMessage || exception?.message || 'Internal Server Error',
      exception
    };

    delete errorResponse.exception;

    response.status(exception.status || 406).json(errorResponse);
    
    return;

  }
}
