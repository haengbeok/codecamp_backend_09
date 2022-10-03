export function checkDash(rrn) {
  if (!rrn.includes("-")) {
    console.log("형식이 올바르지 않습니다.");
    return false;
  }
  return true;
}

export function checkNum(rrn) {
  const frontNum = rrn.split("-")[0];
  const backNum = rrn.split("-")[1];

  if (frontNum.length !== 6 || backNum.length !== 7) {
    console.log("개수를 제대로 입력해주세요.");
    return false;
  }
  return true;
}

export function maskingNum(rrn) {
  const frontNum = rrn.split("-")[0];
  const backNum = rrn.split("-")[1];

  const cut = backNum.slice(backNum.length - 1);
  const mask = "*".repeat(6);
  const maskingNum = mask + cut;

  console.log(`${frontNum}-${maskingNum}`);
}
