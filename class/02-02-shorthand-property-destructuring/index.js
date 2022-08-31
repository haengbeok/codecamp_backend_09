// 1. shorthand-property
function qqq(aaa) {
  console.log(aaa);
  console.log(aaa.name); // 철수
  console.log(aaa.age); // 12
  console.log(aaa.school); // 다람쥐초등학교
}
const name = "철수";
const age = 12;
const school = "다람쥐초등학교";

// const profile = {
//   name: name,
//   age: age,
//   school: school,
// };

// 위처럼 key와 value가 같으면 value 생략 가능 => shorthand-property
// const profile = { name, age, school };
qqq({ name, age, school }); // == qqq(profile)

// 2. destructuring
// function www(aaa) {
//   console.log(aaa); // { apple: 3, banana: 10}  ==>  const aaa = basket  과 같은 얘기
//   // const aaa = { apple: 3, banana: 10}  이것과 동일한 얘기
//   // const { apple, banana } = { apple: 3, banana: 10}
// }

function www({ apple, banana }) {
  // const { apple, banana } = basket
}

const basket = {
  apple: 3,
  banana: 10,
};

www(basket);
