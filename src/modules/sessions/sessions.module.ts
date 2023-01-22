import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema } from './Schema/Session.schema';
import { SessionsResolver } from './sessions.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'session', schema: SessionSchema }]),
    AuthModule,
  ],
  providers: [SessionsService, SessionsResolver],
  controllers: [SessionsController],
  exports: [SessionsService, SessionsResolver],
})
export class SessionsModule {}
