import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { JwtGoogleStrategy } from 'src/commons/auth/jwt-social-google.strategy';
import { AuthController } from './auth.controller';
import { JwtNaverStrategy } from 'src/commons/auth/jwt-social-naver.strategy';
import { JwtKakaoStrategy } from 'src/commons/auth/jwt-social-kakao.strategy';
import { IamportService } from '../iamport/iamport.service';
import { MovieUser } from '../moviesUsers/entities/movieUser.entity';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      User, //
      MovieUser,
    ]),
  ],
  providers: [
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    JwtNaverStrategy,
    JwtKakaoStrategy,
    IamportService,
    AuthResolver, //
    AuthService,
    UserService,
  ],
  controllers: [
    AuthController, //
  ],
})
export class AuthModule {}
