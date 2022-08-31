// console.log("안녕하세요");

function getToken(qqq) {
  if (qqq === undefined) {
    console.log("숫자를 제대로 입력해 주세요");
    return;
  }
  if (qqq < 2) {
    console.log("갯수가 너무 적습니다");
    return;
  }
  if (qqq >= 10) {
    console.log("갯수가 너무 많습니다");
    return;
  }
  const result = String(Math.floor(Math.random() * 10 ** qqq)).padStart(
    qqq,
    "0"
  );
  console.log(result);
  //
  //
  //
  //
  if (qqq !== undefined) {
    if (qqq >= 2) {
      if (qqq < 10) {
        const result = String(Math.floor(Math.random() * 10 ** qqq)).padStart(
          qqq,
          "0"
        );
        console.log(result);
      } else {
        console.log("갯수가 너무 많습니다");
      }
    } else {
      console.log("갯수가 너무 적습니다");
    }
  } else {
    console.log("숫자를 제대로 입력해 주세요");
  }
}

getToken();
