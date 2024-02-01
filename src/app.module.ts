import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/AuthModule';
import { PrismaModule } from './modules/PrismaModule';
import { CommentModule } from './modules/CommentModule';
import { EventsModule } from './modules/EventsModule';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CommentModule,
    PrismaModule,
    EventsModule,
  ],
})
export class AppModule {}
