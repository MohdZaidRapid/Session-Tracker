import { forwardRef, Module } from '@nestjs/common';
import { PortfolioResolver } from './portfolio.resolver';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioSchema } from './Schema/portfolio.schema';
import { BlogModule } from '../blog/blog.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'portfolio', schema: PortfolioSchema }]),
    AuthModule,
    // BlogModule,
    forwardRef(() => BlogModule)
  ],
  providers: [PortfolioResolver, PortfolioService],
  controllers: [PortfolioController],
  // forwardRef(() => CatsModule)
  exports: [PortfolioModule, PortfolioResolver, PortfolioService],
})
export class PortfolioModule {}
