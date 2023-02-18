import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signUp.dto';
import { User } from './interface/user.interface';
import { SignInDto } from './dto/sign.dto';
import { MailService } from '../mail/mail.service';
import { ResetPasswordDto } from './dto/forgotPassword';
import { decode } from 'punycode';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  /**
   * @description create jwt payload with user info and convert to jwt token
   * @param  { user{email}}  }
   * @returns {message success}
   */
  //author MohdZaid
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
   * @description it verify token  status it is valid or not if valid return user
   * @param  { token  }
   * @returns { user}
   */
  //author MohdZaid
  async verifyToken(token: string) {
    const payload = await this.jwtService.verify(token);
    const user = await this.userModel.findOne({ email: payload.email });
    return user;
  }

  /**
   * @description Create User return User
   * @param CreateUserDto {phone email password username portfolio}
   * @returns {phone email password username portfolio ,token}
   */
  //author MohdZaid
  async signUpUser(signupDto: SignupDto) {
    try {
      let alreadyExists = await this.userModel.findOne({
        email: signupDto.email,
      });
      if (alreadyExists) {
        throw new ConflictException('account with this email already exists');
      }
      let user = await this.userModel.create(signupDto);
      const { token } = await this.createJwtpayload(user);
      if (!user.token) {
        user.token = [];
      }
      user.token.push(token);
      await user.save();
      user = JSON.parse(JSON.stringify(user));

      if (user?.password || user?.password !== null) {
        delete user.password;
      }
      if (!user) {
        throw new NotFoundException("Can't create user something went wrong");
      }
      this.mailService.confirmMail(
        user.email,
        `http://localhost:3000/auth/confirm-mail/${token}`,
      );
      return {
        user: user,
        token: token,
        message: 'We have sent an Email,Please verify your email to logged in',
      };
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
      if (!user.confirmEmail) {
        throw new Error('Please verify your email to logged in');
      }
      const isMatch = await user.checkPassword(signInDto.password);
      if (!isMatch) {
        throw new NotFoundException(
          'user not found Please check your email or password',
        );
      }
      const { token } = await this.createJwtpayload(user);
      if (!user.token) {
        user.token = [];
      }
      user.token.push(token);
      user.save();
      user = JSON.parse(JSON.stringify(user));
      if (user?.password || user?.password !== null) {
        delete user.password;
      }
      const userData = {
        user: user,
        token: token,
      };
      if (user && isMatch) {
        return userData;
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

  /**
   * @description send reset Password link to email when user will open that link it so he/she can change there password
   * @param  { email  }
   * @returns {message success}
   */
  //author MohdZaid
  async forgotPassword({ email }) {
    try {
      const user = await this.userModel.findOne({ email: email });
      if (!user) {
        throw new Error('no user found with this email');
      }
      const { token, expiresIn } = await this.createJwtpayload(user);

      const expirationIn = new Date();
      expirationIn.setHours(expirationIn.getHours() + 1);
      await this.userModel.findByIdAndUpdate(user._id, {
        $set: {
          refreshToken: token,
          resetPasswordExpiresIn: expiresIn,
        },
      });

      await this.mailService.sendWelcomeEmail(
        user.email,
        `http://localhost:3000/auth/reset-password/${token}`,
      );
      return {
        message: 'email sent to reset your password ! Please check your email',
        success: true,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description reset Password
   * @param  { email  }
   * @returns {message success}
   */
  //author MohdZaid
  async findUserByRefresheToken(token) {
    const user = await this.userModel.findOne({
      refreshToken: token,
    });
    return user;
  }

  /**
   * @description reset Password
   * @param  { email  }
   * @returns {message success}
   */
  //author MohdZaid
  async confirmUserMail(token) {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userModel.findOne({ email: decoded.email });
      if (user.confirmEmail) {
        if (!user) {
          throw new Error('Your token expired or user not found');
        }
        throw new Error(
          'user already confirm now logged in what are you waiting for !!!!',
        );
      }
      user.confirmEmail = true;
      await user.save();
      return user;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
   * @description it update user profile
   * @param  { user information  }
   * @returns {message success}
   */
  //author MohdZaid
  async updateUserInfo(userInfoDto) {
    const user = await this.userModel.findOne(userInfoDto.userId);
    if (!user) {
      throw new Error('No user found with this id');
    }
    if (user) {
      const { userId, ...otherProperties } = userInfoDto;
      let password = otherProperties.password;
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return new Error(err.message);
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) return new Error(err.message);
          password = hash;
          const userData = {
            ...otherProperties,
            password,
          };
          await this.userModel.updateOne(userData);
        });
      });
    }
    return {
      message: 'user updated successfully',
      success: true,
    };
  }

  async signOut(user) {
    try {
      user.token = [];
      await user.save();

      return {
        message: 'user logged out successfully',
        success: true,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getAllUsers(getAllUserDto) {
    try {
      let { limit, sortOrder, offSet, username } = getAllUserDto;

      limit = limit || 100;
      offSet = offSet | 0;
      if (offSet < 0) {
        offSet = 0;
      }
      const sort: any = {
        createdAt: sortOrder ? sortOrder : -1,
      };

      const matches: any = {};
      const orQuery = [];
      if (username) {
        orQuery.push({ username: username });
      }

      if (orQuery.length > 0) {
        matches['$and'] = orQuery;
      }

      let users = await this.userModel
        .find(matches)
        .sort(sort)
        .limit(limit)
        .skip(offSet);

      users = await Promise.all(
        users.map((user) => {
          user = JSON.parse(JSON.stringify(user));
          delete user.password;
          return user;
        }),
      );
      return users;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
