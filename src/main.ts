import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = 8080;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(PORT);
  new Logger('Main App Bootstrap').log(`Server Running at ${PORT}`);
}
bootstrap();
