import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, Validate } from "class-validator";
import { HtmlTagValidator  } from "src/utils/CommentTextValidator";
import { validationOptionsMsg } from "src/utils/ValidationMessage";

export class createCommentDTO {
  @IsString()
  //@Validate(HtmlTagValidator)
  text: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  parentId?: number;
}