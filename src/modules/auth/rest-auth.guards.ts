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
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Role } from './roles/Roles';
import { AuthService } from './auth.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

export const ROLES_KEY = 'roles';

@Injectable()
export class RestAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
    private reflector: Reflector,
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
        throw new NotFoundException('no bearer found');
      }
      const token = auth.split(' ')[1];
      let reqUser = null;
      await jwt.verify(
        token,
        this.configService.get('JWT_SECRET_KEY'),
        async (err, tokenInfo: any) => {
          if (err) {
            throw new NotFoundException(err.message);
          } else {
            let user = null;
            try {
              user = await this.authService.findByEmail({
                email: tokenInfo.email,
              });
            } catch (e) {
              user = null;
              return {
                error: e.message,
              };
            }
            if (user) {
              if (user.token.includes(token)) {
                reqUser = user;
                return reqUser;
              } else {
                throw new NotFoundException(
                  'The token provided does not belong to any existing user. Please log in to access this resource.',
                );
              }
            }
          }
        },
      );
      if (reqUser) {
        return reqUser;
      } else {
        return {
          error: 'Unauthorized',
        };
      }
    } catch (err) {
      throw err;
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
