import { Injectable } from "@nestjs/common";
import { GetCommentsDTO } from "src/dtos/GetCommentsDTO";


@Injectable()
export class CommentMapper {
  getCommentQuery(data: GetCommentsDTO) {
    /**По дефолту воно буде брати 25, як і сказано в умові, проте я вирішив передбачити, щоб воно могло віддавати й інші кількості */
    
    const toTake: number = data.limit || 25;
    const page: number = data.page || 1;
    const toSkip: number = toTake * (page - 1);
    const rule = data.rule || 'asc';
    let orderBy;
    if(data.order === 'createdAt' || !data.order) {
      orderBy = {
        createdAt: rule
      }
    } else {
      orderBy = {
        user: {
          [data.order]: rule
        }
      }
    }

    return {
      take: toTake,
      skip: toSkip,
      orderBy,
    }
  }
}