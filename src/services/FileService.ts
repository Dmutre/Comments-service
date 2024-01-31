import { Injectable } from "@nestjs/common";
import * as uuid from 'uuid';
import { writeFileSync } from 'fs';
import { join, extname } from 'path'; 


@Injectable()
export class FileService {
  private filePathToDir: string = join(__dirname, '..', 'static');

  public async uploadFile(file: Express.Multer.File) {
    if (file) {
      const originalExtension = extname(file.originalname); // Отримати розширення оригінального файлу
      const fileName = `${this.getRandomFileName()}${originalExtension}`;
      const filePath = join(this.filePathToDir, fileName);
      writeFileSync(filePath, file.buffer);
      return fileName;
    }
  }

  private getRandomFileName() {
    return uuid.v4();
  }
}