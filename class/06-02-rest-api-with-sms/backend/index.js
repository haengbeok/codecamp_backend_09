// const express = require('express')
import express from "express";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get("/boards", function (req, res) {
  // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  const result = [
    { number: 1, writer: "철수", title: "제목입니다", contents: "내용이에요" },
    { number: 2, writer: "영희", title: "영희입니다", contents: "영희에요" },
    { number: 3, writer: "훈이", title: "훈이입니다", contents: "훈이에요" },
  ];

  // 2. DB에서 거내온 결과를 브라우저에 응답(response) 주기
  res.send(result);
});

app.post("/boards", function (req, res) {
  // 1. 브라우저에서 보내준 데이터 확인하기
  console.log(req.body);

  // 2. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
  //

  // 3. DB에 저장이 잘 됐으면 결과를 브라우저에 응답(response) 주기
  res.send("게시물 등록에 성공했습니다.");
});

app.post("/tokens/phone", (req, res) => {
  const myPhone = req.body.myPhone;

  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkPhone(myPhone);
  if (isValid === false) return;

  // 2. 핸드폰 토큰 6자리 만들기
  const myToken = getToken();

  // 3. 핸드폰번호에 토큰 전송하기
  sendTokenToSMS(myPhone, myToken);
  res.send("인증완료");
});

app.listen(3000, () => {
  console.log("서버프로그램을 켜는데 성공했습니다");
});
