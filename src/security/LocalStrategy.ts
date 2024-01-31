import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../services/AuthService';
import { Strategy } from 'passport-local';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor (private authService: AuthService) {
    super();
  }

  async validate (username: string, email: string, password: string): Promise<any> {
    return this.authService.validateUser(username, email, password);
  }
}