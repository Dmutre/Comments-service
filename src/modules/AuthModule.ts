import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "src/controller/AuthController";
import { JwtGuard } from "src/security/JwtGuard";
import { JwtStrategy } from "src/security/JwtStrategy";
import { LocalAuthGuard } from "src/security/LocalAuthGuard";
import { LocalStrategy } from "src/security/LocalStrategy";
import { AuthService } from "src/services/AuthService";
import { PrismaModule } from "./PrismaModule";
import { FileService } from "src/services/FileService";


@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalAuthGuard, JwtGuard, JwtStrategy, LocalStrategy, FileService],
  imports: [JwtModule.register({
    global: true,
    secret: process.env.SECRET,
    signOptions: { expiresIn: '86400s' },
  }), PrismaModule],
  exports: []
})
export class AuthModule {}