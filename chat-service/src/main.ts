import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { SentryInterceptor } from './common/interceptor/sentry.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4004,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new SentryInterceptor());

  await app.startAllMicroservices();
  await app.listen(4004);
  console.log(`CHAT-SERVICE listening on 4004 for TCP!`);
}
bootstrap();
