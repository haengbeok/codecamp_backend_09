// 문제 설명
// 행렬의 덧셈은 행과 열의 크기가 같은 두 행렬의 같은 행, 같은 열의 값을 서로 더한 결과가 됩니다.
// 2개의 행렬 arr1과 arr2를 입력받아, 행렬 덧셈의 결과를 반환하는 함수, solution을 완성해주세요.

// 제한 조건
// 행렬 arr1, arr2의 행과 열의 길이는 500을 넘지 않습니다.
// 입출력 예
//    arr1	             arr2	          return
// [[1,2],[2,3]]	  [[3,4],[5,6]]	   [[4,6],[7,9]]
//   [[1],[2]]	       [[3],[4]]	     [[4],[6]]

function solution(arr1, arr2) {
  const answer = [[]];

  // 1. arr1 배열의 전체 배열 요소들을 가져온다
  for (let i = 0; i < arr1.length; i++) {
    // 2. arr1 배열에서 가져온 배열의 요소들을 참조
    for (let j = 0; j < arr1[i].length; j++) {
      // 3. i와 j 인덱스 값으로 각각의 위치에 해당하는 요소들의 합
      const sum = arr1[i][j] + arr2[i][j];
      // 4. i에 해당하는 인덱스에 접근시 배열이 없다면 빈 배열 생성
      if (answer[i] === undefined) {
        answer[i] = [];
      }
      // 5. i와 j 인덱스를 활용해 answer의 해당 위치에 데이터를 직접 삽입
      answer[i][j] = sum;
    }
  }

  return answer;
}

//

function solution(arr1, arr2) {
  const answer = arr1.map((numArr, i) => {
    return numArr.map((num, j) => {
      return num + arr2[i][j];
    });
  });

  return answer;
}
