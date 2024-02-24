import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 4001;
  await app.listen(port);
  console.log(`USER-SERVICE listening on port ${port}!`);
}
bootstrap();
