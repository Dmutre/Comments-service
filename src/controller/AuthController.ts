import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/security/JwtGuard";


@Controller({
  path: '/auth'
})
export class AuthController {
  
  @Get()
  async getData() {
    return 'Hell0';
  }
}