import { getToday } from "./date.js";

export function checkValidationEmail(email) {
  if (email === undefined || !email.includes("@")) {
    console.log("이메일 주소를 확인해주세요");
    return false;
  }
  return true;
}

export function getWelcomeTemplate({ name, age, school }) {
  return `
          <html>
              <body>
                  <h1>${name}님 가입을 환영합니다.</h1>
                  <hr />
                  <div>이름: ${name}</div>
                  <div>나이: ${age}</div>
                  <div>학교: ${school}</div>
                  <div>가입일: ${getToday()}</div>
              </body>
          </html>
      `;
}

export function sendWelcomeTemplateToEmail(email, template) {
  console.log(`${email}로 ${template}을 전송`);
}
