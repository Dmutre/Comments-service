import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

const PORT = process.env.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: process.env.FRONTEND_URL,
  });
  app.setGlobalPrefix('/api');
  app.use('/api/static', express.static(join(__dirname, '..', 'static')));
  await app.listen(PORT, () => {
    console.log('Server started on port: ' + PORT)
  });
}
bootstrap();
