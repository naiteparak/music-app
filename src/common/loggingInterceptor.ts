import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { LoggerService } from '../Logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService,
  ) {
    const logLevels = this.configService.get('LOG_LEVELS').split(',');
    this.loggerService.setContext('LoggingInterceptor');
    this.loggerService.setLogLevels(logLevels);
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    this.loggerService.log({
      url: `${request.method} ${request.url} request received`,
      query: request.query,
      body: request.body,
    });
    return next.handle().pipe(
      tap((body) => {
        const response = context.switchToHttp().getResponse();
        this.loggerService.log({
          statusCode: response.statusCode,
          url: `${response.req.method} ${response.req.url} response sent`,
          body: body,
        });
      }),
      catchError((err) => {
        this.loggerService.error({
          statusCode: response.statusCode,
          errorMessage: err.message,
        });
        return throwError(err);
      }),
    );
  }
}
