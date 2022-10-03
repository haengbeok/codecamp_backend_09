import { getToday } from "./utils.js";

export function checkEmail(email) {
  if (email === undefined || !email.includes("@")) {
    console.log("이메일을 제대로 입력해주세요");
    return false;
  }
  return true;
}

export function getTemplate({ name, age, school }) {
  return `
          <html>
              <body>
                  <h1>${name}님 가입을 환영합니다.</h1>
                  <hr>
                  <div>이름: ${name}</div>
                  <div>나이: ${age}</div>
                  <div>학교: ${school}</div>
                  <div>가입일: ${getToday()}</div>
              </body>
          </html>
          `;
}

export function sendTemplateToEmail(email, template) {
  console.log(`${email} (으)로 템플릿 ${template} 을(를) 전송했습니다.`);
}
