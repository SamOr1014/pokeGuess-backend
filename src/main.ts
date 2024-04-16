import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { config as swaggerConfig } from './config/swagger';

const PORT = 8080;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );
  await app.listen(PORT);
  new Logger('Main App Bootstrap').log(`Server Running at ${PORT}`);
}
bootstrap();
