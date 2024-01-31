import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "src/dtos/CreateUserDTO";
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

  @Post('/registration')
  async registrate(
    @Body() data: CreateUserDTO
  ) {
    return await this.authService.registrate(data);
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