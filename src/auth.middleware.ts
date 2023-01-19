import {
  Injectable,
  NestMiddleware,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { ConfigService } from '@nestjs/config';

import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  async use(req, res, next: () => void) {
    const bearerHeader = req.headers['Authorization'];

    if (!bearerHeader) {
      throw new Error('no token found');
    }
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];

    await jwt.verify(
      token,
      this.configService.get('JWT_SECRET_KEY'),
      async (err, tokenInfo) => {
        if (err) {
          console.log(err.message);
        } else {
          let user = null;
          try {
            user = await this.authService.findByEmail({
              email: tokenInfo.email,
            });
          } catch (e) {
            user = null;
          }

          if (user) {
            console.log(user);
            req.user = user;
            next();
            return;
          }
        }
      },
    );
    if (!req.user) {
      throw new Error('user not logged in');
    }
  }
}
