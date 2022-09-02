// 오른쪽 myShooping은 내가 구매한 목록을 보여주고 있습니다.

// 해당 목록에서 "의류"를 구매한 횟수와 총 금액을 나타내고,

// "의류"를 구매한 횟수에 따라 등급을 나타내세요.

// 등급표
// "0~2"  ⇒ Bronze

// "3~4" ⇒ Silver

// 5이상 ⇒ Gold

// **`입력 인자`**

// - X

// **`주의 사항`**

// - 반복문을 통해 문제를 풀어야 합니다.
// - myShopping 내용을 직접 수정하면 안 됩니다.
// - 예상 결과에 나온 문구와 형식이 같아야 합니다.

const myShopping = [
  { category: "과일", price: 12000 },
  { category: "의류", price: 10000 },
  { category: "의류", price: 20000 },
  { category: "장난감", price: 9000 },
  { category: "과일", price: 5000 },
  { category: "의류", price: 10000 },
  { category: "과일", price: 8000 },
  { category: "의류", price: 7000 },
  { category: "장난감", price: 5000 },
  { category: "의류", price: 10000 },
];

function grade(list) {
  let count = 0; // 의류를 구매한 횟수
  let total = 0; // 총 구매금액
  let gr = ""; // 구매등급
  for (let i = 0; i < list.length; i++) {
    if (list[i].category === "의류") {
      count++;
      total += list[i].price;
    }
  }
  if (count >= 5) {
    gr = "Gold";
  } else if (count >= 3) {
    gr = "Silver";
  } else {
    gr = "Bronze";
  }
  return `의류를 구매한 횟수는 총 ${count}회, 금액은 ${total}원이며, 등급은 ${gr}입니다.`;
}

grade(myShopping);
