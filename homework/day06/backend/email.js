import { getToday } from "./utils.js";
import nodemailer from "nodemailer";
import "dotenv/config.js";

export function checkEmail(myemail) {
  if (myemail === undefined || myemail.includes("@") === false) {
    console.log("에러 발생!!! 이메일 주소를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate({ name, phone, favoriteSite }) {
  // const {age, createdAt} = { name, age, school, createdAt }
  const mytemplate = `
          <html>
              <div style="display: flex; flex-direction: column; align-items: center;>
              <div width: 500px";>
                  <h1>${name}님 가입을 환영합니다!!!</h1>
                  <hr />
                  <div >이름: ${name}</div>
                  <div>전화번호: ${phone}</div>
                  <div>좋아하는사이트: ${favoriteSite}</div>
                  <div style="color:red">가입일: ${getToday()}</div>
              </div>
              </div>
          </html>
      `;
  return mytemplate;
  return mytemplate;
  // console.log(mytemplate)
}

export async function sendTemplateToEmail(myemail, result) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PW = process.env.EMAIL_PW;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PW,
    },
  });

  const response = await transporter.sendMail({
    from: EMAIL_SENDER,
    to: myemail,
    subject: "가입을 축하합니다", //제목
    html: result, //클릭하면 나오는 페이지
  });
  console.log(response);
  // console.log(
  //   myemail + "이메일로 가입환영템플릿 " + result + "를 전송합니다!!!"
  // );
}
