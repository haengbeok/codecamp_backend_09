import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user?: {
    email: string;
    hashedPassword: string;
    name: string;
    age: number;
  };
}

@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 1. 회원조회
    let user = await this.usersService.findOne({ email: req.user.email });

    // 2. 가입이 안돼있다면? 자동회원가입
    if (!user) user = await this.usersService.create({ ...req.user });

    // async create({ email, hashedPassword: password, name, age }) {
    //   const user = await this.userRepository.findOne({ where: { email } });
    //   if (user) throw new ConflictException('이미 등록된 이메일입니다.');
    //   //   throw new HttpException('이미 등록된 이메일입니다.', HttpStatus.CONFLICT); // 이렇게도 가능
    //   return this.userRepository.save({
    //     email,
    //     password,
    //     name,
    //     age,
    //   });
    // }

    // 3. 가입이 돼있다면? 로그인 (refreshToken, accessToken 만들어서 프론트엔드에 주기)
    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/class/21-03-login-google/frontend/social-login.html',
    );
  }
}
