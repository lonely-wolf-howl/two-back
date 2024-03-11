import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SentryInterceptor } from './common/interceptor/sentry.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 8080;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new SentryInterceptor());

  await app.listen(port);
  console.log(`CHAT-SERVICE listening on ${port}!`);
}
bootstrap();
