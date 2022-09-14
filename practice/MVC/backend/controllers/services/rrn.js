export function customRegistrationNumber(rrn) {
  if (rrn.includes("-") == false) {
    console.log("ㄴㄴ안댐");
    return;
  }

  const arr = rrn.split("-");
  const frontNum = arr[0];
  const backNum = arr[1];

  if (frontNum.length !== 6 || backNum.length !== 7) {
    return;
  }

  const backNumArr = [...backNum];
  backNumArr.fill("*", 1);
  const result = frontNum + "-" + backNumArr.join("");

  return result;
}
