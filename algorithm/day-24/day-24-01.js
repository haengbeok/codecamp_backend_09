//숫자 문자열과 영단어

// 네오와 프로도가 숫자놀이를 하고 있습니다.
// 네오가 프로도에게 숫자를 건넬 때 일부 자릿수를 영단어로 바꾼 카드를 건네주면 프로도는 원래 숫자를 찾는 게임입니다.

// 다음은 숫자의 일부 자릿수를 영단어로 바꾸는 예시입니다.

// 1478 → "one4seveneight"
// 234567 → "23four5six7"
// 10203 → "1zerotwozero3"
// 이렇게 숫자의 일부 자릿수가 영단어로 바뀌어졌거나, 혹은 바뀌지 않고 그대로인 문자열 s가 매개변수로 주어집니다.
// s가 의미하는 원래 숫자를 return 하도록 solution 함수를 완성해주세요.

// 참고로 각 숫자에 대응되는 영단어는 다음 표와 같습니다.

// 숫자	영단어
// 0	zero
// 1	one
// 2	two
// 3	three
// 4	four
// 5	five
// 6	six
// 7	seven
// 8	eight
// 9	nine
// 제한사항
// 1 ≤ s의 길이 ≤ 50
// s가 "zero" 또는 "0"으로 시작하는 경우는 주어지지 않습니다.
// return 값이 1 이상 2,000,000,000 이하의 정수가 되는 올바른 입력만 s로 주어집니다.
// 입출력 예
//        s	                result
// "one4seveneight"	         1478
// "23four5six7"	          234567
// "2three45sixseven"	      234567
//      "123"                123
// 입출력 예 설명
// 입출력 예 #1
// 문제 예시와 같습니다.

// 입출력 예 #2
// 문제 예시와 같습니다.

// 입출력 예 #3
// "three"는 3, "six"는 6, "seven"은 7에 대응되기 때문에 정답은 입출력 예 #2와 같은 234567이 됩니다.
// 입출력 예 #2와 #3과 같이 같은 정답을 가리키는 문자열이 여러 가지가 나올 수 있습니다.

// 입출력 예 #4
// s에는 영단어로 바뀐 부분이 없습니다.

// 제한시간 안내
// 정확성 테스트 : 10초

//
// replace
// 1. 문자열에서 사용 가능
// 2. 첫번째 인자로 들어오는 문자열을 두번째 인자로 들어오는 문자열 변경

const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

//

function solution(s) {
  for (let i = 0; i < numbers.length; i++) {
    while (s.includes(numbers[i])) {
      s = s.replace(numbers[i], i);
    }
  }
  return Number(s);
}

//

function solution(s) {
  for (let i = 0; i < numbers.length; i++) {
    s = s.replaceAll(numbers[i], i);
  }
  return Number(s);
}

//

function solution(s) {
  numbers.forEach((el, i) => {
    s = s.split(el).join(i);
  });
  return Number(s);
}

//

function solution(s) {
  // 표현식 사용법 : 슬래시를 열고 닫아준다.
  // 슬래시 안쪽에 검증할 문자열
  // g : 문자열 전체에서 검색
  // console.log(s.replace( /zero/g, '0' ))
  /**
  s = s.replace(/zero/g, "0");
  s = s.replace(/one/g, "1");
  s = s.replace(/two/g, "2");
  s = s.replace(/three/g, "3");
  s = s.replace(/four/g, "4");
  s = s.replace(/five/g, "5");
  s = s.replace(/six/g, "6");
  s = s.replace(/seven/g, "7");
  s = s.replace(/eight/g, "8");
  s = s.replace(/nine/g, "9");
  return Number(s);
   */

  for (let i = 0; i < numbers.length; i++) {
    const regExp = new RegExp(numbers[i], "g"); // 표현식에서 변수를 사용하려면 RegExp 생성자를 사용해야함
    s = s.replace(regExp, i);
  }
  return Number(s);
}
