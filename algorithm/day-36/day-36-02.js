// 올바른 괄호
// 문제 설명
// 괄호가 바르게 짝지어졌다는 것은 '(' 문자로 열렸으면 반드시 짝지어서 ')' 문자로 닫혀야 한다는 뜻입니다.

// 예를 들어

// "()()" 또는 "(())()" 는 올바른 괄호입니다.
// ")()(" 또는 "(()(" 는 올바르지 않은 괄호입니다.
// '(' 또는 ')' 로만 이루어진 문자열 s가 주어졌을 때, 문자열 s가 올바른 괄호이면 true를 return 하고,
// 올바르지 않은 괄호이면 false를 return 하는 solution 함수를 완성해 주세요.

// 제한사항
// 문자열 s의 길이 : 100,000 이하의 자연수
// 문자열 s는 '(' 또는 ')' 로만 이루어져 있습니다.

// 입출력 예
//      s	        answer
//    "()()"	     true
//   "(())()"        true
//   ")()("	         false
//   "(()("	         false

// 입출력 예 설명
// 입출력 예 #1,2,3,4
// 문제의 예시와 같습니다.

function solution(s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[0] === ")" || s[s.length - 1] === "(") return false;
    s[i] === "(" ? count++ : count--;
    if (count < 0) return false;
  }
  return count === 0 ? true : false;
}

//

function solution(s) {
  if (s[0] === ")" || s[s.length - 1] === "(") return false;

  let depth = 0;
  for (let str of s) {
    // 열려있다면 1을 더한다
    if (str === "(") depth++;
    // 닫혀있다면 1을 뺀다
    else if (str === ")") depth--;
    if (depth < 0) return false;
  }
  return depth === 0 ? true : false;
}

//

function solution(s) {
  if (s[0] === ")" || s[s.length - 1] === "(") return false;

  let fail = false;
  const answer = s.split("").reduce((acc, cur) => {
    if (acc < 0) {
      fail = true;
    }
    return acc + (cur === "(" ? 1 : -1);
  }, 0);

  return answer === 0 && fail === false ? trun : false;
}
