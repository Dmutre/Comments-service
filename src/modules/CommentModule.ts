import { Module } from "@nestjs/common";
import { CommentController } from "src/controller/CommentController";
import { CommentService } from "src/services/CommentService";
import { PrismaModule } from "./PrismaModule";
import { FileService } from "src/services/FileService";


@Module({
  controllers: [CommentController],
  providers: [CommentService, FileService],
  imports: [PrismaModule]
})
export class CommentModule {}