import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { AssertionError } from 'assert';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    let response = host.switchToHttp().getResponse();

    if (error instanceof AssertionError) {
      return response.status(400).send({
        message: error.message,
      });
    }
  }
}
