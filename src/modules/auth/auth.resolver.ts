import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CheckDto, SignInDto } from './dto/sign.dto';
import { SignupDto } from './dto/signUp.dto';
import { Auth, GetUserId } from './auth.guard';
import { User, UserTokenData } from './type-def/resolver-type';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserTokenData, { name: 'signUpUser' })
  async signUpUser(@Args('input') signupDto: SignupDto) {
    const data = await this.authService.signUpUser(signupDto);
    return data;
  }

  @Mutation(() => UserTokenData, { name: 'signIn' })
  async signIn(@Args('input') signInDto: SignInDto) {
    const user = await this.authService.validateUser(signInDto);
    const { token } = await this.authService.createJwtpayload(user);
    return { user, token };
  }

  @Mutation(() => String, { name: 'check' })
  @Auth()
  async check(@GetUserId() user, @Args('input') checkDto: CheckDto) {
    console.log(user);
    checkDto.name = 'zaididiidiidididididid';
    return checkDto;
  }
}
