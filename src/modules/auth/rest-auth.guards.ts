import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  applyDecorators,
  UseGuards,
  Logger,
  Inject,
  createParamDecorator,
  SetMetadata,
  NotFoundException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AuthService } from 'src/modules/auth/auth.service';
import { Role } from './roles/Roles';

export const ROLES_KEY = 'roles';

@Injectable()
export class RestAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (req.headers && req.headers.authorization) {
      req.user = await this.validateToken(req.headers.authorization);

      if (!req.user) {
        throw new Error('no user or request token timeout');
      }
      if (!requiredRoles) {
        return true;
      } else {
        return requiredRoles.includes(req.user.role);
      }
    }
    return false;
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new NotFoundException('no bearer found');
    }

    const token = auth.split(' ')[1];
    let reqUser = null;
    await jwt.verify(
      token,
      this.configService.get('JWT_SECRET_KEY'),
      async (err, tokenInfo: any) => {
        if (err) {
          console.log('err');
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
            reqUser = user;
            return reqUser;
          }
        }
      },
    );

    if (reqUser) {
      return reqUser;
    } else {
      return null;
    }
  }
}

export function Auth(...roles: Role[]) {
  SetMetadata(ROLES_KEY, roles);
  return applyDecorators(UseGuards(RestAuthGuard));
}

export const GetUserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);

export const Roles = (...roles: Role[]) => {
  return SetMetadata(ROLES_KEY, roles);
};
