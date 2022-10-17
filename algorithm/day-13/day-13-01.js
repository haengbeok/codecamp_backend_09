// 문제 설명
// 임의의 양의 정수 n에 대해, n이 어떤 양의 정수 x의 제곱인지 아닌지 판단하려 합니다.
// n이 양의 정수 x의 제곱이라면 x+1의 제곱을 리턴하고, n이 양의 정수 x의 제곱이 아니라면 -1을 리턴하는 함수를 완성하세요.

// 제한 사항
// n은 1이상, 50000000000000 이하인 양의 정수입니다.
// 입출력 예
// n	return
// 121	144
// 3	-1
// 입출력 예 설명
// 입출력 예#1
// 121은 양의 정수 11의 제곱이므로, (11+1)를 제곱한 144를 리턴합니다.

// 입출력 예#2
// 3은 양의 정수의 제곱이 아니므로, -1을 리턴합니다.

function solution(n) {
  let answer = -1;

  for (let i = 1; i * i <= n; i++) {
    if (i * i === n) {
      //제곱근을 찾은 경우
      answer = i + 1;
      return answer * answer;
    }
  }
  return answer;
}

//

function solution(n) {
  let answer = -1;

  for (let i = 1; i * i <= n; i++) {
    if (i * i === n) {
      return (i + 1) ** 2;
    }
  }
  return answer;
}

//

function solution(n) {
  // sqrt() 인자의 제곱근을 구해줌
  let sqrt = Math.sqrt(n);
  // isInteger() 인자가 정수인지 확인
  if (Number.isInteger(sqrt)) {
    // 정수인 경우 : 제곱근이 있는 경우
    // return (sqrt + 1) ** 2;
    // return (sqrt + 1) * (sqrt + 1)
    return Math.pow(sqrt + 1, 2); // pow(a, b) a를 b제곱해줌
  } else {
    // 정수가 아닌 경우 : 제곱근이 없는 경우
    return -1;
  }
}
