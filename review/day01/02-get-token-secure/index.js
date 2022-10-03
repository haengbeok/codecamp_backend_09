function getToken(count) {
  if (count === undefined) {
    console.log("갯수를 입력해주세요");
    return;
  } else if (count <= 0) {
    console.log("갯수가 적습니다 ( 1 이상 적어주세요 )");
    return;
  } else if (count > 10) {
    console.log("갯수가 많습니다 ( 10 이하로 적어주세요 )");
    return;
  }

  const result = String(Math.floor(Math.random() * 10 ** count)).padStart(count, "0");
  // const result2 = String(Math.ceil(Math.random() * 10 ** count)).padStart(count, "0");

  console.log(result);
  // console.log(result2);
  return result; //, result2;
}

getToken(4);
getToken(6);
getToken(8);
getToken();
getToken(-1);
getToken(11);
