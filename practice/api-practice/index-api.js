function checkPhone(phoneNum) {
  if (phoneNum.length !== 10 && phoneNum.length !== 11) {
    console.log("핸드폰 번호를 제대로 입력해 주세요");
    return false;
  } else {
    return true;
  }
}

function getToken() {
  const qqq = 6;
  if (qqq === undefined) {
    console.log("숫자를 제대로 입력해 주세요");
    return;
  }
  if (qqq < 2) {
    console.log("갯수가 너무 적습니다");
    return;
  }
  if (qqq >= 10) {
    console.log("갯수가 너무 많습니다");
    return;
  }
  const result = String(Math.floor(Math.random() * 10 ** qqq)).padStart(
    qqq,
    "0"
  );
  return result;
}

function sendTokenToSMS(phoneNum, result) {
  console.log(phoneNum + "번호로 인증번호 " + result + "를 전송합니다");
}

function createTokenOfPhone(phoneNum) {
  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkPhone(phoneNum);
  if (isValid === false) return;

  // 2. 핸드폰 토큰 6자리 만들기
  const myToken = getToken();

  // 3. 핸드폰번호에 토큰 전송하기
  sendTokenToSMS(phoneNum, myToken);
}

createTokenOfPhone("01012345678");
