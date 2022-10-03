function checkPhone(myPhone) {
  if (myPhone.length !== 10 && myPhone.length !== 11) {
    console.log("번호를 제대로 입력해주세요");
    return false;
  }
  return true;
}

function getToken(count) {
  if (count === undefined) {
    console.log("갯수를 입력해주세요");
    return;
  } else if (count <= 0) {
    console.log("갯수가 적습니다 ( 1 이상 적어주세요 )");
    return;
  } else if (count > 10) {
    console.log("갯수가 많습니다 ( 10 이하로 적어주세요 )");
    return;
  }

  const result = String(Math.floor(Math.random() * 10 ** count)).padStart(count, "0");
  return result;
}

function sendTokenToSMS(myPhone, token) {
  if (token === undefined) {
    return;
  }
  console.log(`${myPhone} 번호로 인증번호 ${token} 를 전송했습니다.`);
}

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
