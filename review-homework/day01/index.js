import { checkDash, checkNum, maskingNum } from "./resident-registration-number-facade.js";

function customRegistrationNumber(rrn) {
  // '-' 있는지 체크
  const isValid = checkDash(rrn);

  // 있으면 앞자리 뒷자리 길이 체크
  if (isValid) {
    const isChecked = checkNum(rrn);
    if (isChecked) {
      maskingNum(rrn);
    }
    return;
  }
}

customRegistrationNumber("210510-1010101");
customRegistrationNumber("210510-1010101010101");
customRegistrationNumber("2105101010101");
