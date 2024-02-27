import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'user-service',
        port: 3001,
      },
    },
  );
  await app.listen();
  console.log(`USER-SERVICE listening on 4001 for TCP!`);
}
bootstrap();
