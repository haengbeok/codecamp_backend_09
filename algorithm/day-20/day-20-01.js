// 문제 설명
// 수많은 마라톤 선수들이 마라톤에 참여하였습니다. 단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다.

// 마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때,
// 완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// 마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
// completion의 길이는 participant의 길이보다 1 작습니다.
// 참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.
// 참가자 중에는 동명이인이 있을 수 있습니다.
// 입출력 예
//        participant	                                           completion	                                     return
// ["leo", "kiki", "eden"]	                                     ["eden", "kiki"]	                                  "leo"
// ["marina", "josipa", "nikola", "vinko", "filipa"]	["josipa", "filipa", "marina", "nikola"]                	"vinko"
// ["mislav", "stanko", "mislav", "ana"]	                ["stanko", "ana", "mislav"]	                            "mislav"
// 입출력 예 설명
// 예제 #1
// "leo"는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

// 예제 #2
// "vinko"는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

// 예제 #3
// "mislav"는 참여자 명단에는 두 명이 있지만, 완주자 명단에는 한 명밖에 없기 때문에 한명은 완주하지 못했습니다.

function solution(participant, completion) {
  for (let i = 0; i < participant.length; i++) {
    if (!completion.includes(participant[i])) {
      console.log(participant[i]);
    }
  }
}
// 동명이인이 있어서 틀림

//

function solution(participant, completion) {
  participant = participant.sort();
  completion = completion.sort();

  for (let i = 0; i < participant.length; i++) {
    if (participant[i] !== completion[i]) {
      return participant[i];
    }
  }
}

//

// splice
// 배열에서 사용 가능한 메서드
// 1. 지정한 배열의 특정 구간 요소를 제거할 수 있다
// 2. 지정한 배열의 특정 구간에 요소를 추가할 수 있다
//
// const arr = [1, 2, 3, 4, 5]
// arr.splice(1, 1) // 1번 인덱스부터 1개 제거하겠다 -> 제거한 데이터들이 담긴 배열을 반환 [2]
// arr // [1, 3, 4, 5]
//
// arr.splice(1, 0, 2) // 1번 인덱스부터 0개 제거하고 2를 추가하겠다
// arr // [1, 2, 3, 4, 5]

function solution(participant, completion) {
  for (let i = 0; i < completion.length; i++) {
    // console.log(completion[i])
    if (participant.includes(completion[i])) {
      participant.splice(participant.indexOf(completion[i]), 1);
    }
  }
  return participant[0];
}

// 효율성이 좋지 못함 (오래걸림)

function solution(participant, completion) {
  participant.sort((a, b) => (a > b ? 1 : -1));
  completion.sort((a, b) => (a > b ? 1 : -1));

  for (let i = 0; i < participant.length; i++) {
    if (participant[i] !== completion[i]) {
      return participant;
    }
  }
}

//

function solution(participant, completion) {
  participant.sort((a, b) => (a > b ? 1 : -1));
  completion.sort((a, b) => (a > b ? 1 : -1));

  const answer = participant.filter((name, i) => {
    // console.log(name, completion[i])
    return name !== completion[i];
  });

  return answer[0];
}
