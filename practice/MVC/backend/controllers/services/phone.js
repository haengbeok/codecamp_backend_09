import coolsms from "coolsms-node-sdk";
const mysms = coolsms.default;
import "dotenv/config";

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

export async function sendTokenToSMS(myPhone, result) {
  // .env를 가져오기위해 npm에서 dotenv를 설치해야함
  // yarn add dotenv
  // import "dotenv/config";
  const SMS_KEY = process.env.SMS_KEY;
  const SMS_SECRET = process.env.SMS_SECRET;
  const SMS_SENDER = process.env.SMS_SENDER;

  const messageService = new mysms(SMS_KEY, SMS_SECRET); // github생성때 public으로 만들어서 이대로 올리면 정보 다 까발려짐
  const response = await messageService.sendOne({
    to: myPhone,
    from: SMS_SENDER,
    text: `안녕하세요. 요청하신 인증번호는 [${result}] 입니다.`,
  });
  console.log(response);
  // console.log(myPhone + "번호로 인증번호 " + result + "를 전송합니다");
}
