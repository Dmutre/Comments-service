import { Body, Controller, Get, Post, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserDTO } from "src/dtos/CreateUserDTO";
import { AvatarValidationPipe } from "src/pipes/AvatarValidationPipe";
import { JwtGuard } from "src/security/JwtGuard";
import { LocalAuthGuard } from "src/security/LocalAuthGuard";
import { AuthService } from "src/services/AuthService";


@Controller({
  path: '/auth'
})
export class AuthController {

  constructor(
    private authService: AuthService
  ) {} 

  @UseInterceptors(FileInterceptor('file'))
  @Post('/registration')
  async registrate(
    @Body() data: CreateUserDTO,
    @UploadedFile(new AvatarValidationPipe()) file: Express.Multer.File
  ) {
    return await this.authService.registrate(data, file);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Request() req
  ) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtGuard)
  @Post('/refresh')
  async refreshToken(
    @Request() req
  ) {
    return this.authService.refresh(req.user);
  }
}