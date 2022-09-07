// 문제 설명
// 자연수 N이 주어지면, N의 각 자릿수의 합을 구해서 return 하는 solution 함수를 만들어 주세요.
// 예를들어 N = 123이면 1 + 2 + 3 = 6을 return 하면 됩니다.

// 제한사항
// N의 범위 : 100,000,000 이하의 자연수

function solution(n) {
  let sum = 0;
  n = String(n).split("");

  // console.log(n);
  for (let i = 0; i < n.length; i++) {
    // console.log(n[i])
    sum = sum + Number(n[i]);
    // console.log(sum);
  }
  return sum;
}

function solution(n) {
  const answer = String(n)
    .split("")
    .reduce((acc, cur) => {
      return acc + Number(cur);
    }, 0);
}
