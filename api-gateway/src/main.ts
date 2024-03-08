import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 4000;

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.use(
    cors({
      origin: ['http://localhost:3000'],
      methods: 'GET, POST',
      credentials: true,
    }),
  );

  await app.listen(port);
  console.log(`STAGE: ${process.env.STAGE}`);
  console.log(`API-GATEWAY listening on port ${port}!`);
}
bootstrap();
