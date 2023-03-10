import { Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { User } from './interface/user.interface';
import { ResetPasswordDto } from './dto/forgotPassword';
import { SignInDto } from './dto/sign.dto';
import { Auth } from './rest-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('reset-password/:token')
  async getProduct(
    @Args() resetPasswordDto: ResetPasswordDto,
    @Param('token') token,
  ) {
    try {
      let user = await this.authService.findUserByRefresheToken(token);
      if (!user) {
        return new Error('No user found or token expires');
      }
      let isMatch = await bcrypt.compare(
        resetPasswordDto.password,
        user.password,
      );
      if (isMatch) {
        throw new Error("New password can't be equal to previous password");
      }
      user.password = resetPasswordDto.password;
      user.refreshToken = undefined;
      user.resetPasswordExpiresIn = undefined;
      await user.save();
      return {
        suscess: true,
        message: 'Password changed successfully',
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message,
      };
    }
  }

  @Get('confirm-mail/:token')
  async confirmUserMail(@Param('token') token) {
    try {
      await this.authService.confirmUserMail(token);

      return {
        success: true,
        message: 'account confirm successfully',
      };
    } catch (error) {
      return {
        error: error.message,
        status: false,
      };
    }
  }

  @Post('/signin')
  async signInUser(@Args() signInDto: SignInDto) {
    try {
      const { user, token } = await this.authService.signInUser(signInDto);
      // const { token } = await this.authService.createJwtpayload(user);
      return { user, token };
    } catch (err) {
      return {
        message: err.message, 
      };
    }
  }

  // @Get('/signout')
  // @Auth()
  // async signout() {
  //   try {
  //     if()
  //   } catch (err) {
  //     return {
  //       message: err.message,
  //     };
  //   }
  // }
}
