import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CheckDto, SignInDto } from './dto/sign.dto';
import { SignupDto } from './dto/signUp.dto';
import { Auth, GetUserId } from './auth.guard';
import { User, UserTokenData } from './type-def/resolver-type';
import { MessageDef } from '../sessions/typeDef/resolver-type';
import { ForgotPasswordDto } from './dto/forgotPassword';

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
    const user = await this.authService.signInUser(signInDto);
    const { token } = await this.authService.createJwtpayload(user);
    return { user, token };
  }

  @Mutation(() => String, { name: 'check' })
  @Auth()
  async check(@GetUserId() user, @Args('input') checkDto: CheckDto) {
    console.log(user);
    checkDto.name = 'zaid';
    return checkDto;
  }

  @Mutation(() => MessageDef, { name: 'forgotPassword' })
  async forgotPassword(
    @GetUserId() user,
    @Args('input') forgotPasswordDto: ForgotPasswordDto,
  ) {
    return await this.authService.forgotPassword(forgotPasswordDto);
  }
}
