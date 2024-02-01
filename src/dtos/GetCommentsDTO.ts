import { Transform } from "class-transformer";
import { IsIn, IsNumber, IsOptional } from "class-validator";

export class GetCommentsDTO {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  limit?: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  page?: number;

  @IsIn(['email', 'username', 'createdAt'])
  @IsOptional()
  order?: string;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  rule?: string;
}