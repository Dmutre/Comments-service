import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import * as bcrypt from 'bcrypt';
import { InvalidEntityIdException } from "src/utils/exception/InvalidEntityException";
import { CreateUserDTO } from "src/dtos/CreateUserDTO";
import { AlreadyRegisteredException } from "src/utils/exception/AlreadyRegisteredException";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { FileService } from "./FileService";


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private fileService: FileService,
  ) {}

  async validateUser(username: string, email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
        email: email,
      },
    });

    if (!user) {
      throw new InvalidEntityIdException('User');
    }

    const isMatch = await this.checkPassword(password, user.password);
    
    if (!isMatch) {
      throw new UnauthorizedException('The password is incorrect');
    }

    delete user.password;

    return user;
  }

  private async checkPassword (password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async registrate(data: CreateUserDTO, file: Express.Multer.File) {
    if(await this.checkIfUserAlreadyRegistered(data.email)) {
      throw new AlreadyRegisteredException();
    }

    data.password = await this.hashPassword(data.password);

    const avatar = await this.fileService.uploadFile(file);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        avatar: avatar,
      }
    });

    return this.generateTokens(user);
  }

  private async checkIfUserAlreadyRegistered(email: string) {
    const user = this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } 

  private async hashPassword(password: string) {
    const saltTimes = 10;
    const salt = await bcrypt.genSalt(saltTimes);
    return bcrypt.hash(password, salt);
  }

  private generateTokens(user: User) {
    const payload = this.createPayload(user);

    return {
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_TTL
      }),
      access_token: this.jwtService.sign(payload),
    };
  }

  private createPayload(user: User) {
    return {
      sub: user.id,
      username: user.username,
      createdAt: Date.now()
    }
  }

  async login(user: User) {
    return this.generateTokens(user);
  }

  refresh(user: User) {
    const payload = this.createPayload(user);
    return this.generateAccessToken(payload);
  }

  generateAccessToken(payload) {
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}