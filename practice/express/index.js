import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("어서 오고");
});

app.listen(3000, () => {
  console.log("서버 시작");
});
