import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import * as Jimp from "jimp";

@Injectable()
export class FileValidationPipe implements PipeTransform {
  maxTextSize: number = 100 * 1024;//Максимальний розмір текстових файлів
  allowedImageTypes: string[] = ['image/jpeg', 'image/png', 'image/gif'];
  maxImageWidth: number = 320;
  maxImageHeight: number = 240;

  async transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if(!value) return null;

    const {mimetype, size, buffer } = value;

    if(mimetype === 'text/plain') {
      if(size > this.maxTextSize) throw new BadRequestException('Text file size should not exceed 100KB')
      return value;
    }

    if (this.allowedImageTypes.includes(mimetype)) {
      const image = await Jimp.read(buffer);
      const { width, height } = image.bitmap;

      if (width > this.maxImageWidth || height > this.maxImageHeight) {
        image.scaleToFit(this.maxImageWidth, this.maxImageHeight);
        const resizedImageBuffer = await image.getBufferAsync(mimetype);

        return {
          ...value,
          buffer: resizedImageBuffer,
          width: image.bitmap.width,
          height: image.bitmap.height,
        };
      }

      // Якщо файл не відповідає умовам, повертаємо null
      return null;
    }
  }
}