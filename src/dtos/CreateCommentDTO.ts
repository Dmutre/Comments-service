import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { IsValidHTML } from "src/utils/CommentTextValidator";
import { validationOptionsMsg } from "src/utils/ValidationMessage";

export class createCommentDTO {
  @IsString()
  //@IsValidHTML(validationOptionsMsg('Invalid tag text format'))
  text: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  parentId?: number;
}