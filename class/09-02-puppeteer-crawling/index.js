// 여기어때/야놀자 크롤링 위법 사례 : https://biz.chosun.com/topics/law_firm/2021/09/29/OOBWHWT5ZBF7DESIRKNPYIODLA/
// 사람인/잡코리아 크롤링 위법 사례 : https://brunch.co.kr/@lawmission/113

import puppeteer from "puppeteer";

async function startCrawling() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://www.goodchoice.kr/product/search/2/2012"); //goto = 주소 입력하고 엔터 쳤다
  await page.waitForTimeout(1000); // 1초 기다림 ( browser가 떠있는 시간 )

  const stage = await page.$eval(
    //page에서 선택한 태그를 뽑아옴
    "#poduct_list_area > li:nth-child(2) > a > div > div.name > div > span",
    (el) => el.textContent // 그 안의 text만 뽑아서 가져옴
  );

  const location = await page.$eval(
    "#poduct_list_area > li:nth-child(2) > a > div > div.name > p:nth-child(4)",
    (el) => el.textContent
  );

  const price = await page.$eval(
    "#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b",
    (el) => el.textContent
  );

  console.log(stage);
  console.log(location.trim());
  console.log(price);

  await browser.close();
}

startCrawling();
