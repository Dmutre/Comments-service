import { Body, Controller, Post, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { createCommentDTO } from "src/dtos/CreateCommentDTO";
import { FileValidationPipe } from "src/pipes/FileValidationPipe";
import { JwtGuard } from "src/security/JwtGuard";
import { CommentService } from "src/services/CommentService";


@Controller({
  path: '/comments'
})
export class CommentController {

  constructor(
    private commentService: CommentService
  ) {}
  
  @UseGuards(JwtGuard)
  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async createComment(
    @Body() data: createCommentDTO,
    @Request() req,
    @UploadedFile(new FileValidationPipe()) file: Express.Multer.File
  ) {
    return this.commentService.createComment(data, req.user, file);
  }
}