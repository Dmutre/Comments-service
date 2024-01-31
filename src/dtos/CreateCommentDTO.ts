import { IsNumber, IsOptional, IsString } from "class-validator";

export class createCommentDTO {
  @IsString()
  text: string;

  @IsNumber()
  @IsOptional()
  parentId?: number;
}