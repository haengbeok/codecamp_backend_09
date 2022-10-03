export function checkPhone(myPhone) {
  if (myPhone.length !== 10 && myPhone.length !== 11) {
    console.log("번호를 제대로 입력해주세요");
    return false;
  }
  return true;
}

export function getToken(count) {
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

export function sendTokenToSMS(myPhone, token) {
  if (token === undefined) {
    return;
  }
  console.log(`${myPhone} 번호로 인증번호 ${token} 를 전송했습니다.`);
}
