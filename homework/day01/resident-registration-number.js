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
  const maskingNumber = [];
  maskingNumber.push(backNum[0]);
  maskingNumber.push("*");
  maskingNumber.push("*");
  maskingNumber.push("*");
  maskingNumber.push("*");
  maskingNumber.push("*");
  maskingNumber.push("*");

  const result = frontNum + "-" + maskingNumber.join("");

  console.log(result);
}

customRegistrationNumber("2105101010101");
