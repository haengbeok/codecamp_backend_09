// - 있는지 확인하기
function customRegistrationNumber(rrn) {
  if (rrn.includes("-") == false) {
    console.log("형식이 올바르지 않습니다");
    return;
  }

  // split으로 앞6자리, 뒤7자리 확인하기
  const arr = rrn.split("-");
  const frontNum = arr[0];
  const backNum = arr[1];

  if (frontNum.length !== 6 || backNum.length !== 7) {
    console.log("갯수를 정확히 입력해주세요");
    return;
  }

  // 뒷자리 masking 하기

  // 반복문 사용
  // const maskingNumber = [];
  // maskingNumber.push(backNum[0]);
  // for (let i = 0; i < 7; i++) {
  //   if (maskingNumber[i] == undefined) {
  //     maskingNumber.push("*");
  //   }
  // }
  // // console.log(maskingNumber);
  // const result = frontNum + "-" + maskingNumber.join("");

  // console.log(result);

  // fill 사용
  const backNumArr = [...backNum];
  backNumArr.fill("*", 1);
  // console.log(backNumArr);
  const result = frontNum + "-" + backNumArr.join("");

  console.log(result);
}

customRegistrationNumber("210510-1010101");
