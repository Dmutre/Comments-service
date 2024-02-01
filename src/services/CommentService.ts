import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/database/PrismaService";
import { createCommentDTO } from "src/dtos/CreateCommentDTO";
import { FileService } from "./FileService";
import { GetCommentsDTO } from "src/dtos/GetCommentsDTO";
import { CommentMapper } from "src/utils/dataMapper/CommentsMapper";
import { EventsGateway } from "src/events/EventsGateway";

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
    private commentMapper: CommentMapper,
    private eventsGateway: EventsGateway,
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

    this.eventsGateway.newCommentHandler(comment);
    return comment;
  }

  async getCommentsRecursive(parentId: number | null, filters: any): Promise<any[]> {
    const comments = await this.prisma.comment.findMany({
      ...filters,
      where: {
        parentId,
      },
      include: {
        children: {
          select: {
            id: true,
            text: true,
            createdAt: true,
            userId: true,
            filepath: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          }
        },
      },
    });
  
    const result = [];
    for (const comment of comments) {
      const children = await this.getCommentsRecursive(comment.id, null);
      result.push({
        ...comment,
        children,
      });
    }
  
    return result;
  }
  
  async getComments(data: GetCommentsDTO): Promise<any> {
    const filters = this.commentMapper.getCommentQuery(data);
    console.log(filters.orderBy)
    const comments = await this.getCommentsRecursive(null, filters);
    return comments;
  }
  
}