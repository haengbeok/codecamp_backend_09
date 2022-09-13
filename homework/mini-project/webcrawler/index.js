// 여기어때/야놀자 크롤링 위법 사례 : https://biz.chosun.com/topics/law_firm/2021/09/29/OOBWHWT5ZBF7DESIRKNPYIODLA/
// 사람인/잡코리아 크롤링 위법 사례 : https://brunch.co.kr/@lawmission/113

import puppeteer from "puppeteer";
import mongoose from "mongoose";
import { Starbucks } from "./models/starbucksSchema.js";

// 몽고DB 접속
mongoose.connect("mongodb://localhost:27017/mini-project");

async function startCrawling() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://www.starbucks.co.kr/menu/drink_list.do"); //goto = 주소 입력하고 엔터 쳤다
  await page.waitForTimeout(1000); // 1초 기다림 ( browser가 떠있는 시간 )
  // const framePage = await page
  //   .frames()
  //   .find((el) => el.url().includes("/item/sise_day.naver?code=005930")); // iframe이 있으면 바로 들어가지 못하고 에러 뜸

  for (let i = 1; i <= 30; i++) {
    const name = await page.$eval(
      `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(16) > ul > li:nth-child(${i}) > dl > dd`,
      (el) => el.textContent
    );

    const img = await page.$eval(
      `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(16) > ul > li:nth-child(${i}) > dl > dt > a > img`,
      (el) => el.src
    );

    const starbucks = new Starbucks({
      name,
      img,
    });
    // console.log(starbucks);
    await starbucks.save();
  }

  await browser.close();
}

startCrawling();
