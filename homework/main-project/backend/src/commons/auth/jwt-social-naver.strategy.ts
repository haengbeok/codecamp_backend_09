import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';

export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    // 검사하는 부분
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/naver',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    // 인가에 성공했을 때
    // console.log(accessToken);
    // console.log(refreshToken);
    console.log(profile); // 네이버, 카카오 할때 콘솔 찍어보기
    return {
      id: profile.id,
      email: profile.emails[0].value,
      password: '1234',
      name: profile.displayName,
      phone: '010-1111-1111',
      personal: '931111-111111',
    };
  }
}
