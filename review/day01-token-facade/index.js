function checkValidationPhone(myphone) {
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true; //검증 통과
  }
}

function getToken(count) {
  if (count === undefined) {
    console.log("에러 발생!!! 갯수를 제대로 입력해 주세요!!!");
    return;
  } else if (count <= 0) {
    console.log("에러 발생!!! 갯수가 너무 적습니다!!!");
    return;
  } else if (count > 10) {
    console.log("에러 발생!!! 갯수가 너무 많습니다!!!");
    return;
  }

  const token = String(Math.floor(Math.random() * 10 ** count)).padStart(count, "0");
  return token;
}

function sendTokenToSMS(myphone, token) {
  console.log(myphone + " 번호로 인증번호 " + token + " 를 전송합니다!!!");
}

// API 만들기
function createTokenOfPhone(myphone, count) {
  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(myphone);

  if (isValid) {
    // 2. 핸드폰 토큰 6자리 만들기
    const token = getToken(count);

    // 3. 핸드폰번호에 토큰 전송하기
    if (token === undefined) {
      return;
    }
    sendTokenToSMS(myphone, token);
  }
}

// API 실행하기
createTokenOfPhone("01012345678", 6);
