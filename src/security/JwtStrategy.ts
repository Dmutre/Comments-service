import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../database/PrismaService';
import * as process from 'process';
import { JwtPayload } from './JwtPayload';
import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
      ignoreExpiration: false,
    });
  }

  async validate (payload: JwtPayload) {
    const user: User = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    delete user.password;

    if (!user) throw new UnauthorizedException();

    return user;
  }
}