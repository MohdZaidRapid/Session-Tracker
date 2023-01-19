import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './Schema/user.schema';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('JWT_SECRET_KEY') || 'secret',
        signOptions: {
          expiresIn: 36000,
        },
      }),
    }),
  ],
  // providers: [AuthService, AuthResolver],
  providers: [AuthService, AuthResolver, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, AuthResolver],
})
export class AuthModule {}
