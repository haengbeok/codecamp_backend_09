// const express = require('express')
import express from "express";

const app = express();

app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("서버프로그램을 켜는데 성공했습니다");
});
