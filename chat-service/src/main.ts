import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 8000;

  await app.listen(port);
  console.log(`CHAT-SERVICE listening on ${port}!`);
}
bootstrap();
