import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { AssertionError } from 'assert';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error: HttpException | AssertionError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    if (error instanceof AssertionError) {
      return response.status(400).json({
        statusCode: 400,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: error.message,
      });
    } else {
      return response.status(error.getStatus()).json({
        statusCode: error.getStatus(),
        timestamp: new Date().toISOString(),
        path: request.url,
        message: error.message.message,
      });
    }
  }
}
