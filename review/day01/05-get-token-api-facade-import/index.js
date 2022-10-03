import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";

function createTokenOfPhone(myPhone, count) {
  // 번호 자릿수 맞는지 확인
  const isValid = checkPhone(myPhone);

  // 인증 토큰을 입력받은 자릿수만큼 만들기
  if (isValid) {
    const token = getToken(count);

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myPhone, token);
  }
}

createTokenOfPhone("01095058024", 7);
