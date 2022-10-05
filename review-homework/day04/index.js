import express from "express";

const app = express();
app.use(express.json());

// GET 요청이 들어왔을 때
app.get("/users", (req, res) => {
  const users = [
    {
      email: "aaa@gmail.com",
      name: "대일",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "aaa@gmail.com",
      name: "석우",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "aaa@gmail.com",
      name: "상훈",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "aaa@gmail.com",
      name: "찬효",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "aaa@gmail.com",
      name: "도현",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
  ];

  res.send(users); // 응답 보내기
});

app.get("/starbucks", (req, res) => {
  const menu = [
    { name: "아메리카노1", kcal: 5 },
    { name: "아메리카노2", kcal: 5 },
    { name: "아메리카노3", kcal: 5 },
    { name: "아메리카노4", kcal: 5 },
    { name: "아메리카노5", kcal: 5 },
    { name: "아메리카노6", kcal: 5 },
    { name: "아메리카노7", kcal: 5 },
    { name: "아메리카노8", kcal: 5 },
    { name: "아메리카노9", kcal: 5 },
    { name: "아메리카노10", kcal: 5 },
  ];

  res.send(menu);
});

app.listen(3000, () => {
  console.log(`${3000}번 포트로 켰다잉`);
}); // 3000번 포트에서 실행
