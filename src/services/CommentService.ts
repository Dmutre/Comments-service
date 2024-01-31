import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/database/PrismaService";
import { createCommentDTO } from "src/dtos/CreateCommentDTO";
import { FileService } from "./FileService";

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  async createComment(data: createCommentDTO, user: User, file: Express.Multer.File) {
    const filePath: string = await this.fileService.uploadFile(file);
    
    const comment = await this.prisma.comment.create({
      data: {
        ...data,
        userId: user.id,
        filepath: filePath,
      },
    });

    return comment;
  }
}