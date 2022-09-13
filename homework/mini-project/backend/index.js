// const express = require('express')
import express from "express";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
  checkEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { Starbucks } from "./models/starbucks.model.js";
import { Token } from "./models/token.model.js";
import { User } from "./models/user.model.js";
import { customRegistrationNumber } from "./rrn.js";
import { getOpenGraph } from "./og.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.post("/user", async function (req, res) {
  // 1. 브라우저에서 보내준 데이터 확인하기
  console.log(req.body);

  // 2. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
  // console.log(await Token.findOne({ isAuth: false }));

  if (await Token.findOne({ isAuth: false })) {
    res.status(422).send("인증되지않았습니다.");
  } else {
    const rrn = req.body.personal;
    let result = customRegistrationNumber(rrn);

    const { name, phone, email } = req.body;
    const isValid = checkEmail(email);
    if (isValid === false) return;
    const mytemplate = getWelcomeTemplate({ name, phone, email });
    sendTemplateToEmail(email, mytemplate);

    const og_data = await getOpenGraph(req.body.prefer);
    console.log(og_data);

    const user = new User({
      name: req.body.name,
      email,
      personal: result,
      prefer: req.body.prefer,
      pwd: req.body.pwd,
      phone: req.body.phone,
      og: og_data,
    });
    await user.save();
    // 3. DB에 저장이 잘 됐으면 결과를 브라우저에 응답(response) 주기
    res.send(user._id);
  }
});

app.get("/users", async function (req, res) {
  // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  const result = await User.find();

  // 2. DB에서 거내온 결과를 브라우저에 응답(response) 주기
  res.send(result);
});

app.post("/tokens/phone", async (req, res) => {
  const myPhone = req.body.myPhone;
  // console.log(myPhone);

  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkPhone(myPhone);
  if (isValid === false) return;

  // 2. 핸드폰 토큰 6자리 만들기
  const myToken = getToken();

  // 이미 있는 번호라면 토큰 덮어쓰기
  if (await Token.findOne({ phone: myPhone })) {
    await Token.updateOne({ phone: myPhone }, { token: myToken });
  } else {
    // DB에 접속해서 데이터 저장
    const token = new Token({
      token: myToken,
      phone: myPhone,
      isAuth: false,
    });
    await token.save();
  }

  // 3. 핸드폰번호에 토큰 전송하기
  sendTokenToSMS(myPhone, myToken);
  res.send("핸드폰으로 인증문자가 전송되었습니다.");
});

app.patch("/tokens/phone", async (req, res) => {
  // console.log(req.body); // {token: '######'}
  const myToken = req.body.myToken;
  // console.log(myToken); // ######

  // 1. 토큰 일치 여부 확인
  if (await Token.findOne({ token: myToken }, { isAuth: "false" })) {
    await Token.updateOne({ isAuth: "true" });
    res.send("true");
  } else {
    res.send("false");
  }
});

app.get("/starbucks", async (req, res) => {
  const starbucks = await Starbucks.find();
  // console.log(starbucks);
  res.send(starbucks);
});

// 몽고DB 접속
mongoose.connect("mongodb://my-database:27017/mini-project");

// Backend API 서버 오픈

app.listen(3000, () => {
  console.log("서버프로그램을 켜는데 성공했습니다");
});
