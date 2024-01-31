import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../services/AuthService';
import { Strategy } from 'passport-local';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor (private authService: AuthService) {
    super({
      passReqToCallback: true,
    });
  }

  async validate (request: any, username: string, password: string, ): Promise<any> {
    const email = request.body.email;
    return this.authService.validateUser(username, email, password);
  }
}