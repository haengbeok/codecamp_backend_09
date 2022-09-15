// 문제 설명
// 정수 배열 numbers가 주어집니다.
// numbers에서 서로 다른 인덱스에 있는 두 개의 수를 뽑아 더해서 만들 수 있는 모든 수를
// 배열에 오름차순으로 담아 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// numbers의 길이는 2 이상 100 이하입니다.
// numbers의 모든 수는 0 이상 100 이하입니다.
// 입출력 예
// numbers	result
// [2,1,3,4,1]	[2,3,4,5,6,7]
// [5,0,2,7]	[2,5,7,9,12]
// 입출력 예 설명
// 입출력 예 #1

// 2 = 1 + 1 입니다. (1이 numbers에 두 개 있습니다.)
// 3 = 2 + 1 입니다.
// 4 = 1 + 3 입니다.
// 5 = 1 + 4 = 2 + 3 입니다.
// 6 = 2 + 4 입니다.
// 7 = 3 + 4 입니다.
// 따라서 [2,3,4,5,6,7] 을 return 해야 합니다.
// 입출력 예 #2

// 2 = 0 + 2 입니다.
// 5 = 5 + 0 입니다.
// 7 = 0 + 7 = 5 + 2 입니다.
// 9 = 2 + 7 입니다.
// 12 = 5 + 7 입니다.
// 따라서 [2,5,7,9,12] 를 return 해야 합니다.

function solution(numbers) {
  const answer = [];

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const sum = numbers[i] + numbers[j];
      if (!answer.includes(sum)) {
        answer.push(sum);
      }
    }
  }
  return answer.sort((a, b) => a - b);
}

//
/**
 * const newSet = new Set()
 * 1. 배열 형태를 가지는 객체 데이터
 * typeof newSet // object
 * typeof []     // object
 *
 * Array.isArray([])        // true
 * Array.isArray(newSet)    // false
 *
 * 2. 고유한 값만 저장 ( 중복 데이터 x)
 *
 * // 데이터 추가
 * newSet.add()
 *
 * // 데이터 삭제
 * newSet.delete()
 *
 * // 데이터 조회
 * newSet.has()
 *
 * // 데이터 조회
 * newSet.size  // .length랑 같은 의미
 *
 * // 데이터 초기화
 * newSet.clear()
 */

function solution(numbers) {
  const answer = new Set([]);

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const sum = numbers[i] + numbers[j];
      answer.add(sum);
    }
  }
  //   return Array.from(answer)
  return [...answer].sort((a, b) => a - b);
}

//

function solution(numbers) {
  const answer = new Set([]);

  numbers.forEach((num1, i) => {
    numbers.slice(i + 1).forEach((num2) => {
      const sum = num1 + num2;
      answer.add(sum);
    });
  });
  return [...answer].sort((a, b) => a - b);
}
