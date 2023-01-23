import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Auth, GetUserId } from '../auth/auth.guard';
import { BlogService } from '../blog/blog.service';
import { GetAllPortfolioDto } from '../blog/dto/blog.dto';
import { MessageDef } from '../sessions/typeDef/resolver-type';
import {
  CreatePortfolioDto,
  GetAllPortFolioDto,
  UpdatePorfolioDto,
} from './dto/createportfolio.dto';
import { PortfolioService } from './portfolio.service';
import { PortfolioDef } from './typeDef/resolver-type';

@Resolver()
export class PortfolioResolver {
  constructor(
    private readonly portfolioService: PortfolioService,
    private readonly blogService: BlogService,
  ) {}

  @Auth()
  @Mutation(() => MessageDef, { name: 'createPortfolio' })
  async createPortfolio(
    @Args('input') createPortfolioDto: CreatePortfolioDto,
    @GetUserId() user,
  ) {
    createPortfolioDto.user = user._id;
    let getAllBlogs;
    getAllBlogs = await this.blogService.findAllBlog({
      owner: createPortfolioDto.user,
    });
    const dto: any = {
      blogs: getAllBlogs,
      ...createPortfolioDto,
    };
    const data = await this.portfolioService.createPortfolio(dto);
    return data;
  }

  @Auth()
  @Mutation(() => MessageDef, { name: 'updatePortfolio' })
  async updatePortfolio(
    @Args('input') updatePortfolioDto: UpdatePorfolioDto,
    @GetUserId() user,
  ) {
    const dto: any = {
      ...updatePortfolioDto,
      user,
    };
    return await this.portfolioService.updatePortfolio(dto);
  }

  @Auth()
  @Mutation(()=>[PortfolioDef],{name:"getAllPortfolio"})
  async getAllPortfolio(getAllPortFolioDto:GetAllPortFolioDto){
    return await this.portfolioService.getAllPortfolio(getAllPortFolioDto)
  }

  
}
