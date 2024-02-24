import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 4000;

  app.setGlobalPrefix('api');

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(port);
  console.log(`STAGE: ${process.env.STAGE}`);
  console.log(`API-GATEWAY listening on port ${port}!`);
}
bootstrap();
