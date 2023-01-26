import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { User } from './interface/user.interface';
import { ResetPasswordDto } from './dto/forgotPassword';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('reset-password/:token')
  async getProduct(
    @Args() ResetPasswordDto: ResetPasswordDto,
    @Param('token') token,
  ) {
    try {
      let user = await this.authService.findUserByRefresheToken({ token });
      if (!user) {
        return new Error('No user found or token expires');
      }
      user.password = ResetPasswordDto.password;
      user.refreshToken = undefined;
      user.resetPasswordExpiresIn = undefined;
      await user.save();
      return {
        suscess: true,
        message: 'Password changed successfully',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
