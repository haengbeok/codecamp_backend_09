import express from "express";
import cors from "cors";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";

const app = express();
app.use(express.json());
app.use(cors()); // 특정 origin만을 허용하려면 => app.use(cors({origin: }))

// GET 요청이 들어왔을 때
app.get("/boards", (req, res) => {
  const result = [
    {
      number: 1,
      writer: "철수",
      title: "제목입니다~~",
      contents: "내용이에요@@@",
    },
    {
      number: 2,
      writer: "영희",
      title: "영희 제목입니다~~",
      contents: "영희 내용이에요@@@",
    },
    {
      number: 3,
      writer: "훈이",
      title: "훈이 제목입니다~~",
      contents: "훈이 내용이에요@@@",
    },
  ];

  res.send(result); // 응답 보내기
});

app.post("/boards", (req, res) => {
  console.log(req.body);
  // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기

  // 2. 저장 결과 응답 주기
  res.send("게시물 등록 성공!!");
});

app.post("/tokens/phone", (req, res) => {
  const myPhone = req.body.myPhone;

  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkPhone(myPhone);
  if (isValid) {
    // 2. 6자리 토큰 만들기
    const token = getToken(6);

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myPhone, token);
    res.send("인증 완료!!");
  }
});

app.listen(3000, () => {
  console.log(`${3000}번 포트로 켰다잉`);
}); // 3000번 포트에서 실행
