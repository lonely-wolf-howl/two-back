import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { SentryInterceptor } from './common/interceptor/sentry.interceptor';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'record-service',
        port: 4003,
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new SentryInterceptor());

  await app.listen();
  console.log(`RECORD-SERVICE listening on 4003 for TCP!`);
}
bootstrap();
