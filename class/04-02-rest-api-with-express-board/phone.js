export function checkPhone(myPhone) {
  if (myPhone.length !== 10 && myPhone.length !== 11) {
    console.log("핸드폰 번호를 제대로 입력해 주세요");
    return false;
  } else {
    return true;
  }
}

export function getToken() {
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
  // console.log(result);
}

export function sendTokenToSMS(myPhone, result) {
  console.log(myPhone + "번호로 인증번호 " + result + "를 전송합니다");
}
