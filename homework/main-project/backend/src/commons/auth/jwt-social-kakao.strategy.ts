import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao-oauth2';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    // 검사하는 부분
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/kakao',
      scope: ['profile_nickname', 'account_email'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    // ) {
    // 인가에 성공했을 때
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log(profile._json.kakao_account.profile);
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@'); // 네이버, 카카오 할때 콘솔 찍어보기
    // console.log(profile.kakao_account);
    // let socialId = profile._raw.slice(6, 16);
    // console.log(socialId); // 네이버, 카카오 할때 콘솔 찍어보기
    // console.log('profile_nik' + profile);
    // console.log('email : ' + profile._json.kakao_account.email);

    return {
      // socialId: socialId,
      email: profile._json.kakao_account.email,
      password: '1234',
      name: profile.displayName,
      phone: '010-2222-2222',
      personal: '931017-111111',
    };
  }
}
