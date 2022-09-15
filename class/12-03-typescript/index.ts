// 타입 추론
let aaa = "안녕하세요";
aaa = 3;

// 타입 명시
let bbb: string = "반갑습니다";
bbb = 10;

// 타입 명시가 필요한 상황
let ccc: string | number = 1000;
ccc = "1000원";

// 숫자
let ddd: number = 10;
ddd = "철수";

// boolean
let eee: boolean = true;
eee = false;
eee = "false"; // true로 작동함

// 배열
let fff: number[] = [1, 2, 3, 4, 5, "안녕하세요"];
let ggg: string[] = ["철수", "영희", "훈이", 10];
let hhh: (number | string)[] = ["철수", "영희", "훈이", 10]; // 타입을 추론해서 어떤 타입을 사용하는지 알아보기!!

// 객체
interface IProfile {
  name: string;
  age: number | string;
  school: string;
  hobby?: string; // ? : hobby가 있을수도 있고 없을수도 있다
}

const profile: IProfile = {
  name: "철수",
  age: 8,
  school: "다람쥐초등학교",
};

profile.hobby = "수영";
profile.name = "영희";
profile.age = "8살";

// 함수 => 어디서 몇번이든 호출 가능하므로, 타입 추론 할 수 없음(반드시 타입 명시 필요!!)
function add1(num1: number, num2: number, unit: string): string {
  return num1 + num2 + unit;
}
const result1 = add1(1000, 2000, "원"); // 결과의 리턴 타입도 예측 가능!!

const add2 = (num1: number, num2: number, unit: string): string => {
  return num1 + num2 + unit;
};
const result2 = add2(1000, 2000, "원");

// any타입
let qqq: any = "철수"; // 자바스크립트와 동일! 안쓰는게 좋음
qqq = 123;
qqq = true;
