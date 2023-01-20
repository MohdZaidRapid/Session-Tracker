import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Auth, GetUserId } from '../auth/auth.guard';
import { MessageDef } from '../sessions/typeDef/resolver-type';
import { CreatePortfolioDto } from './dto/createportfolio.dto';
import { PortfolioService } from './portfolio.service';

@Resolver()
export class PortfolioResolver {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Auth()
  @Mutation(() => MessageDef, { name: 'createPortfolio' })
  async createPortfolio(
    @Args('input') createPortfolioDto: CreatePortfolioDto,
    @GetUserId() user,
  ) {
    createPortfolioDto.email = user.email;
    createPortfolioDto.phone = user.phone;
    createPortfolioDto.name = user.name;
    const data = await this.portfolioService.createPortfolio(
      createPortfolioDto,
    );
    return data;
  }
}
