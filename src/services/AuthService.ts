import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import * as bcrypt from 'bcrypt';
import { InvalidEntityIdException } from "src/utils/exception/InvalidEntityException";


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
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
}