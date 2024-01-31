import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidEntityIdException extends HttpException {
  constructor (entity: string) {
    super(`Such ${entity} was not found`, HttpStatus.BAD_REQUEST);
  }
}