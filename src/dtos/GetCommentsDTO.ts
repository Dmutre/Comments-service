import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class GetCommentsDTO {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page?: number;
}