import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cors({
    origin: process.env.FRONTEND_URL
  }))
  await app.listen(process.env.PORT, () => {
    console.log('Server started on port: ' + process.env.PORT)
  });
}
bootstrap();
