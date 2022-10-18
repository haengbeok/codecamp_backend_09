import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ qqq: '로그인실행해줘' })
  login(data) {
    // gateway의 login과 이름이 같을 필요는 없음

    // 실제 로그인 하기
    console.log(data);
    return 'login 성공!!';
  }

  logout() {
    //
  }

  restoreAccessToken() {
    //
  }
}
