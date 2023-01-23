import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signUp.dto';
import { User } from './interface/user.interface';
import { SignInDto } from './dto/sign.dto';

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
    const expiresIn = '1d';
    const jwt = this.jwtService.sign(data, { expiresIn });

    return {
      expiresIn,
      token: jwt,
    };
  }
  /**
   * @description Create User return User
   * @param CreateUserDto {phone email password username portfolio}
   * @returns {phone email password username portfolio ,token}
   */
  //author MohdZaid
  async signUpUser(signupDto: SignupDto) {
    try {
      let user = await this.userModel.create(signupDto);
      await user.save();
      user = JSON.parse(JSON.stringify(user));

      if (user?.password || user?.password !== null) {
        delete user.password;
      }
      if (!user) {
        throw new NotFoundException("Can't create user something went wrong");
      }
      const { token } = await this.createJwtpayload(user);
      return { user: user, token: token };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description Sigin User return User
   * @param SignInDto { email password  }
   * @returns {User {phone email password username portfolio}}
   */
  //author MohdZaid
  async signInUser(signInDto: SignInDto) {
    try {
      let user = await this.userModel.findOne({ email: signInDto.email });

      if (!user) {
        throw new NotFoundException(
          'user not found Please check your email or password',
        );
      }
      const isMatch = await user.checkPassword(signInDto.password);
      if (!isMatch) {
        throw new NotFoundException(
          'user not found Please check your email or password',
        );
      }
      user = JSON.parse(JSON.stringify(user));
      if (user?.password || user?.password !== null) {
        delete user.password;
      }

      if (user && isMatch) {
        return user;
      }
      return null;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description find user by email or username
   * @param  { email username  }
   * @returns {User {phone email password username portfolio}}
   */
  //author MohdZaid
  async findByEmailOrUsername({ email, username }) {
    try {
      const query: any = {};
      if (email) {
        query.email = email;
      } else if (username) {
        query.username = username;
      } else {
        throw new NotFoundException('user not found');
      }
      const user = await this.userModel.findOne(query);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description find user by email or username
   * @param  { email  }
   * @returns {User {phone email password username portfolio}}
   */
  //author MohdZaid
  async findByEmail({ email }) {
    try {
      const user = await this.userModel.findOne({ email: email });
      if (!user) {
        throw new NotFoundException('user not found');
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
