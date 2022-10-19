interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// 1. Partial 타입
type aaa = Partial<IProfile>; // MyType1에 마우스 올려보면 ? 붙어있음 => 있어도되고 없어도되고

// 2. Required 타입
type bbb = Required<IProfile>; // 전부 필수

// 3. Pick 타입
type ccc = Pick<IProfile, "name" | "age">; // name, age만 선택하겠다

// 4. Omit 타입
type ddd = Omit<IProfile, "school">; // school을 빼겠다

// 5. Record 타입
type eee = "철수" | "영희" | "훈이"; // Union 타입
let child: eee;
child = "철수";

type fff = Record<eee, IProfile>; // Record 타입

let mykey: keyof IProfile; // keyof => let mykey: "name" | "age" | "school" | "hobby"
mykey = "hobby";

// ========== (type vs interface) 차이: 선언병합 ==========
interface IProfile {
  // 같은 이름으로 만들면 병합됨
  candy: number;
}

let profile: Partial<IProfile> = {
  candy: 10, // 선언병합으로 추가
};
