import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { CreateUserInput } from '../users/dto/createUser.input';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: Pick<User, 'email' | 'name' | 'password' | 'phone' | 'personal'>;
}

@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 1. 회원조회
    let user = await this.usersService.findOne({
      userEmail: req.user.email,
    });

    // 2. 가입이 안돼있다면? 자동회원가입
    if (!user) {
      const newUser: CreateUserInput = {
        email: req.user.email,
        name: req.user.name,
        password: req.user.password,
        phone: req.user.phone,
        personal: req.user.personal,
      };
      user = await this.usersService.create({
        createUserInput: newUser,
        hashedPassword: req.user.password,
      });
    }

    // 3. 가입이 돼있다면? 로그인 (refreshToken, accessToken 만들어서 프론트엔드에 주기)
    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/homework/main-project/frontend/login/index.html',
    );
  }
}
