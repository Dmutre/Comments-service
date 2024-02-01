import { Injectable } from "@nestjs/common";
import { GetCommentsDTO } from "src/dtos/GetCommentsDTO";


@Injectable()
export class CommentMapper {
  getCommentQuery(data: GetCommentsDTO) {
    /**По дефолту воно буде брати 25, як і сказано в умові, проте я вирішив передбачити, щоб воно могло віддавати й інші кількості */
    
    const toTake: number = Number(data.limit) || 25;
    const page: number = Number(data.page) || 1;
    const toSkip: number = toTake * (page - 1);

    return {
      take: toTake,
      skip: toSkip,
    }
  }
}