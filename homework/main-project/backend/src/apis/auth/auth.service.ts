import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from '../users/dto/createUser.input';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly usersService: UserService,
  ) {}

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  async socialLogin({ req, res }) {
    if (req.user.email === undefined) {
      // DB에 email 등록하는 로직 작성해라 까먹지말고 ㅇㅋ? 그거 하는중임
      res.redirect('http://localhost:3000/login/kakao');

      return;
    }

    let user = await this.usersService.findOne({
      userEmail: req.user.email,
    });

    // if (user) {
    //   const newGuest: CreateUserInput = {
    //     email: 'guest',
    //     name: req.user.name,
    //     password: req.user.password,
    //     phone: req.user.phone,
    //     personal: req.user.personal,
    //   };
    //   await this.usersService.create({
    //     createUserInput: newGuest,
    //     hashedPassword: req.user.password,
    //   });
    // }

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

    this.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/homework/main-project/frontend/login/index.html',
    );
  }
}
