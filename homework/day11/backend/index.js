import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { SignupController } from "./controllers/Signup.Controller.js";
import { checkPhone, getToken, sendTokenToSMS } from "./controllers/services/phone.js";
import { Token } from "./models/token.model.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

const signupController = new SignupController();
app.post("/user", signupController.checkInfo);
app.get("/users", signupController.userList);
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
