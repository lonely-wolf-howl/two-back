import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SentryInterceptor } from './common/interceptor/sentry.interceptor';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'challenge-service',
        port: 4002,
      },
    },
  );

  app.useGlobalInterceptors(new SentryInterceptor());

  await app.listen();
  console.log(`CHALLENGE-SERVICE listening on 4002 for TCP!`);
}
bootstrap();
