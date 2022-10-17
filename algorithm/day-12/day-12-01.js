// 문제 설명
// 대문자와 소문자가 섞여있는 문자열 s가 주어집니다. s에 'p'의 개수와 'y'의 개수를 비교해 같으면 True, 다르면 False를 return 하는 solution를 완성하세요. 'p', 'y' 모두 하나도 없는 경우는 항상 True를 리턴합니다. 단, 개수를 비교할 때 대문자와 소문자는 구별하지 않습니다.

// 예를 들어 s가 "pPoooyY"면 true를 return하고 "Pyy"라면 false를 return합니다.

// 제한사항
// 문자열 s의 길이 : 50 이하의 자연수
// 문자열 s는 알파벳으로만 이루어져 있습니다.

function solution(s) {
  let p = 0;
  let y = 0;
  let sLower = s.toLowerCase();
  for (let i = 0; i < sLower.length; i++) {
    if (sLower[i] === "p") {
      p += 1;
    } else if (sLower[i] === "y") {
      y += 1;
    }
  }
  if (p === y) {
    return true;
  } else {
    return false;
  }
}

//멘토님 풀이
function solution(s) {
  // let answer = true;
  const obj = { p: 0, y: 0 };
  // let p = 0;
  // let y = 0;

  s.split("").forEach((str) => {
    obj[s[i]] === undefined ? (obj[s[i]] = 1) : obj[s[i]]++;
  });

  // for (let i = 0; i < s.length; i++) {
  //   obj[s[i]] === undefined
  //     ? obj[s[i]] = 1
  //     : obj[s[i]]++
  //   // if (s[i] === "p") {
  //   //   p++;
  //   // } else if (s[i] === "y") {
  //   //   y++;
  //   // }
  // }

  return obj.p === obj.y;
  // return p === y;
  // answer = p === y;
}
