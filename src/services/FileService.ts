import { Injectable } from "@nestjs/common";
import * as uuid from 'uuid';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, extname } from 'path'; 


@Injectable()
export class FileService {
  private dirPath: string = join(__dirname, '..', '..', 'static');

  public async uploadFile(file: Express.Multer.File) {
    this.checkStaticExistene();
    if (file) {
      const originalExtension = extname(file.originalname); // Отримати розширення оригінального файлу
      const fileName = `${this.getRandomFileName()}${originalExtension}`;
      const filePath = join(this.dirPath, fileName);
      writeFileSync(filePath, file.buffer);
      return fileName;
    }
  }

  private getRandomFileName() {
    return uuid.v4();
  }

  private checkStaticExistene() {
    if(!existsSync(this.dirPath)) {
      mkdirSync(this.dirPath);
    }
  }
}