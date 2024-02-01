import { Module } from "@nestjs/common";
import { CommentController } from "src/controller/CommentController";
import { CommentService } from "src/services/CommentService";
import { PrismaModule } from "./PrismaModule";
import { FileService } from "src/services/FileService";
import { CommentMapper } from "src/utils/dataMapper/CommentsMapper";
import { EventsModule } from "./EventsModule";


@Module({
  controllers: [CommentController],
  providers: [CommentService, FileService, CommentMapper],
  imports: [PrismaModule, EventsModule]
})
export class CommentModule {}