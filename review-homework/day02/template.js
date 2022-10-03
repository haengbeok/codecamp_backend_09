function createTemplate({ name, email, personal, phone, prefer }) {
  return `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다.</h1>
                <hr>
                <div>이메일: ${email}</div>
                <div>주민번호: ${personal}</div>
                <div>휴대폰 번호: ${phone}</div>
                <div>좋아하는 사이트: ${prefer}</div>
            </body>
        </html>
        `;
}

const user = {
  name: "대일",
  email: "haengbeok@gmail.com",
  personal: "931017-1111111",
  phone: "010-9505-8024",
  prefer: "google.com",
};

console.log(createTemplate(user));
createTemplate(user);
