import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { UploadsResolver } from './uploads.resolver';
import { SessionsModule } from '../sessions/sessions.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, SessionsModule, MulterModule.register({ dest: './src/modules/uploads/files' })],
  providers: [UploadsService, UploadsResolver],
  controllers: [UploadsController],
})
export class UploadsModule {}
