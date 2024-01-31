import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/AuthModule';
import { PrismaModule } from './modules/PrismaModule';
import { CommentModule } from './modules/CommentModule';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CommentModule,
    PrismaModule,
  ],
})
export class AppModule {}
