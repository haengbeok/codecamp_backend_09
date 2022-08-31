function getWelcomeTemplate({ name, email, rrn, phone, favoriteSite }) {
  const mytemplate = `
      <html>
          <body>
              <h1>${name}님 가입을 환영합니다!!</h1>
              <hr />
              <div>이메일: ${email}</div>
              <div>주민번호: ${rrn}</div>
              <div>휴대폰번호: ${phone}</div>
              <div>좋아하는 사이트: ${favoriteSite}</div>
          </body>
      </html>
      `;

  console.log(mytemplate);
}

const name = "김대일";
const email = "haengbeok@naver.com";
const rrn = "210510-1******";
const phone = "010-1234-5678";
const favoriteSite = "google.com";

getWelcomeTemplate({ name, email, rrn, phone, favoriteSite });

// const result = frontNum + "-" + maskingNumber.join("");
