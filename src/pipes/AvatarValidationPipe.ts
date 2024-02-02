import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class AvatarValidationPipe implements PipeTransform {
  allowedImageTypes: string[] = ['image/jpeg', 'image/png'];
  maxSize: number = 1024 * 1024; //  1 MB in bytes

  async transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!value) {
      return null;
    }

    const { mimetype, size } = value;

    if (!this.allowedImageTypes.includes(mimetype) || size > this.maxSize) {
      throw new BadRequestException(`Invalid image type or size. Allowed types: ${this.allowedImageTypes.join(', ')}. Maximum size: ${this.maxSize / (1024 * 1024)} MB`);
    }

    return value;
  }
}
