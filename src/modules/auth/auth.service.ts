import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signUp.dto';
import { User } from './interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createJwtpayload(user) {
    const data = {
      email: user.email,
    };
  }
  /**
   * @description create User
   * @param SignupDto {title}
   * @returns {message success}
   */
  // author MohdZaid
  async signUpUser(signupDto: SignupDto) {
    try {
      let user = await this.userModel.create(signupDto);
      await user.save();
      user = JSON.parse(JSON.stringify(user));

      if (user?.password || user?.password !== null) {
        user.password = null;
      }
      if (!user) {
        throw new NotFoundException("Can't create user something went wrong");
      }

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
