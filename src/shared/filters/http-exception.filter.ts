import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/generated';
import type = Prisma.type;

interface StandardResponse<T> {
  data: T;
  error: {
    statusCode: number;
    message: string;
    details?: any; // Дополнительные детали об ошибке (если есть)
  } | null;
}

interface ExeptionResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse() as ExeptionResponse;
    const errorResponse: StandardResponse<null> = {
      data: null,
      error: getErrorObj(exceptionResponse),
    };
    response.status(status).json(errorResponse);
  }
}

function getErrorObj(exceptionResponse: ExeptionResponse) {
  let message = '';
  console.log(exceptionResponse.message);
  if (
    Array.isArray(exceptionResponse.message) &&
    exceptionResponse.message.length > 0
  ) {
    message = exceptionResponse.message[exceptionResponse.message.length - 1];
  }

  if (typeof exceptionResponse.message === 'string') {
    message = exceptionResponse.message;
  }
  return {
    statusCode: exceptionResponse.statusCode,
    message,
    error: exceptionResponse.error,
  };
}
