function getTemplate(user) {
  return `
        <html>
            <body>
                <h1>${user.name}님 가입을 환영합니다.</h1>
                <hr>
                <div>이름: ${user.name}</div>
                <div>나이: ${user.age}</div>
                <div>학교: ${user.school}</div>
                <div>가입일: ${user.createdAt}</div>
            </body>
        </html>
        `;
}

// const name = "철수";
// const age = 13;
// const school = "다람쥐초등학교";
// const createdAt = "2022-10-03";
const user = {
  name: "철수",
  age: 13,
  school: "다람쥐초등학교",
  createdAt: "2022-10-03",
};

const result = getTemplate(user);
console.log(result);
