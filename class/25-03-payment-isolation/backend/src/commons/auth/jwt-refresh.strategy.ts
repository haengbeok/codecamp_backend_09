import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    // 검사하는 부분
    super({
      jwtFromRequest: (req) => {
        console.log(req);
        const cookie = req.headers.cookie; // refreshToken=awkleawklelaskd
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: 'myRefreshKey',
    });
  }

  validate(payload) {
    // 인가에 성공했을 때
    console.log(payload); // {email: a@a.com, sub: aiw34jaoikfjlkfja}
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
