import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    // 검사하는 부분
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    // 인가에 성공했을 때
    // console.log(accessToken);
    // console.log(refreshToken);
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    console.log(profile); // 네이버, 카카오 할때 콘솔 찍어보기
    return {
      email: profile.emails[0].value,
      password: '1234',
      name: profile.displayName,
      phone: '010-1111-1111',
      personal: '931111-111111',
    };
  }
}
