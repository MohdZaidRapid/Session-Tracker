import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CheckDto, SignInDto } from './dto/sign.dto';
import { SignupDto } from './dto/signUp.dto';
import { Auth, GetUserId } from './auth.guard';
import { User, UserTokenData } from './type-def/resolver-type';
import { MessageDef } from '../sessions/typeDef/resolver-type';
import { ForgotPasswordDto } from './dto/forgotPassword';
import { GetAllUserDto, UserInfoDto } from './dto/User.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  /**
   * @description Create User return User
   * @param CreateUserDto {phone email password username portfolio}
   * @returns {phone email password username portfolio ,token}
   */
  //author MohdZaid
  @Mutation(() => UserTokenData, { name: 'signUp' })
  async signUpUser(@Args('input') signupDto: SignupDto) {
    const data = await this.authService.signUpUser(signupDto);
    return data;
  }

  /**
   * @description Sigin User return User
   * @param SignInDto { email password  }
   * @returns {User {phone email password username portfolio}}
   */
  //author MohdZaid
  @Mutation(() => UserTokenData, { name: 'signIn' })
  async signInUser(@Args('input') signInDto: SignInDto) {
    const { user, token } = await this.authService.signInUser(signInDto);

    return { user, token };
  }

  @Mutation(() => String, { name: 'check' })
  @Auth()
  async check(@GetUserId() user, @Args('input') checkDto: CheckDto) {
    checkDto.name = 'zaid';
    return checkDto;
  }

  /**
   * @description send reset Password link to email when user will open that link it so he/she can change there password
   * @param  { email  }
   * @returns {message success}
   */
  //author MohdZaid
  @Mutation(() => MessageDef, { name: 'forgotPassword' })
  async forgotPassword(@Args('input') forgotPasswordDto: ForgotPasswordDto) {
    try {
      return await this.authService.forgotPassword(forgotPasswordDto);
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
  @Mutation(() => MessageDef, { name: 'updateUserInfo' })
  @Auth()
  async updateUserInfo(
    @Args('input') userInfoDto: UserInfoDto,
    @GetUserId() user,
  ) {
    const dto = {
      ...userInfoDto,
      userId: user._id,
    };
    return await this.authService.updateUserInfo(dto);
  }

  /**
   * @description it update user profile
   * @param  { user information  }
   * @returns {message success}
   */
  //author MohdZaid

  @Mutation(() => MessageDef, { name: 'logout' })
  @Auth()
  async logout(@GetUserId() user) {
    return await this.authService.signOut(user);
  }

  /**
   * @description it update user profile
   * @param  { user information  }
   * @returns {message success}
   */
  //author MohdZaid
  @Mutation(() => [User], { name: 'getAllUsers' })
  @Auth()
  async getAllUser(
    @Args('input') getAllUserDto: GetAllUserDto,
    @GetUserId() user,
  ) {
    return await this.authService.getAllUsers(getAllUserDto);
  }
}
