import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    // 검사하는 부분
    super({
      //   jwtFromRequest: (req) => {
      //     console.log(req);
      //     const temp = req.headers.authorization;
      //     const accessToken = temp.toLowerCase().replace('bearer', '');
      //     return accessToken;
      //   },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 위에 주석된 부분을 한줄로
      secretOrKey: 'myAccessKey',
    });
  }

  validate(payload) {
    // 인가에 성공했을 때
    // console.log(payload); // {email: a@a.com, sub: aiw34jaoikfjlkfja}
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
