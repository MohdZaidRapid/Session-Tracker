import {
  Injectable,
  CanActivate,
  ExecutionContext,
  applyDecorators,
  UseGuards,
  createParamDecorator,
  NotFoundException,
  SetMetadata,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

import { ConfigService } from '@nestjs/config';

import { AuthService } from 'src/modules/auth/auth.service';
import { Reflector } from '@nestjs/core';
import { Role } from './roles/Roles';

export const ROLES_KEY = 'roles';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    if (req.headers && req.headers.authorization) {
      req.user = await this.validateToken(req.headers.authorization);
      if (!req.user) {
        throw new Error('no user or request token timeout');
      }
      if (!req.user.confirmEmail) {
        throw new Error('Please verify your email to access this');
      }
      return true;
    }
    return false;
  }
  async validateToken(auth: string) {
    try {
      if (auth.split(' ')[0] !== 'Bearer') {
        throw new Error('no bearer found');
      }

      const token = auth.split(' ')[1];

      let reqUser = null;
      await jwt.verify(
        token,
        this.configService.get('JWT_SECRET_KEY'),
        async (err, tokenInfo: any) => {
          if (err) {
            throw new Error(err.message);
          } else {
            let user = null;
            try {
              user = await this.authService.findByEmail({
                email: tokenInfo.email,
              });
            } catch (e) {
              user = null;
              throw new Error(e.message);
            }
            if (user) {
              if (user.token.includes(token)) {
                reqUser = user;
                return reqUser;
              } else {
                throw new Error('Token not found for this user');
              }
            }
          }
        },
      );
      if (reqUser) {
        return reqUser;
      } else {
        throw new Error('Unauthorized');
      }
    } catch (err) {
      throw err;
    }
  }
}

export const GetUserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    return req.user;
  },
);

export function Auth(...roles: Role[]) {
  SetMetadata(ROLES_KEY, roles);
  return applyDecorators(UseGuards(AuthGuard));
}
