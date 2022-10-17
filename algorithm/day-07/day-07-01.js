// 문제 설명
// 단어 s의 가운데 글자를 반환하는 함수, solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.

// 재한사항
// s는 길이가 1 이상, 100이하인 스트링입니다.

function solution(s) {
  let answer = "";
  if (s.length % 2 === 0) {
    answer = s[s.length / 2 - 1] + s[s.length / 2];
  } else {
    answer = s[Math.floor(s.length / 2)];
  }
  return answer;
}

// s= "abcde"  // "c"
// s= "qwer" // "we"

function solution(s) {
  let center = Math.floor(s.length / 2);
  let answer = s[center];

  if (s.length % 2 === 0) {
    //짝수일 경우 가운데 2글자를 가져온다
    answer = s[center - 1] + answer;
  }
  return answer;
}

function solution(s) {
  let center = Math.floor(s.length / 2);
  let answer = s.length % 2 === 0 ? s.slice(center - 1, center + 1) : s[center];

  return answer;
}
