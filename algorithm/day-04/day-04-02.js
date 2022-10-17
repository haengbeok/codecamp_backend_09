// **`문제 설명`**

// 문자열에서 "a"가 몇 번 등장하는지 횟수를 구하는 함수를 만들려고 합니다.

// 반복문을 이용해 "a"의 등장 횟수를 변수 "count"에 할당하세요.

// **`입력 인자`**

// - str은 문자열입니다.

// **`주의 사항`**

// - for을 이용해서 문제를 풀어야 합니다.
// - 문자열도 배열입니다.
// - 대문자 "A" 문자열도 "a" 에 포함입니다.

function countLetter(str) {
  str = str.toLowerCase(); // 모든 알파벳을 소문자로 <==> toUpperCase()
  let answer = 0;
  for (let i = 0; i <= str.length; i++) {
    if (str[i] === "a") {
      console.log(str[i]);
      answer++;
    }
  }
  return answer;
}

countLetter("A day without laughter is a day wasted.");
