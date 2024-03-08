import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl: url } = request;
    const userAgent = request.get('user-agent') || '';

    const start = Date.now();

    response.on('close', () => {
      const { statusCode } = response;
      const duration = Date.now() - start;
      this.logger.log(
        `${method} ${url} ${statusCode} - ${userAgent} - ${duration}ms`,
      );
    });

    next();
  }
}
