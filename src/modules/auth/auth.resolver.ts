import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signUp.dto';
import { User } from './type-def/resolver-type';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, { name: 'signUpUser' })
  async signUpUser(@Args('input') signupDto: SignupDto) {
    const data = await this.authService.signUpUser(signupDto);
    return data;
  }
}
