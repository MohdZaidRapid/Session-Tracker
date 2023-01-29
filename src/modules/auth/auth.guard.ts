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
    const requiredRoles = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!req.user) {
      new Error('Not Authorized');
    }

    if (req.headers && req.headers.authorization) {
      req.user = await this.validateToken(req.headers.authorization);
      if (!req.user) {
        throw new Error('no user or request token timeout');
      }
      if (!req.user.confirmEmail) {
        throw new Error('Please verify your email to access this');
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
      // console.log(reqUser)
      return reqUser;
    } else {
      return null;
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
