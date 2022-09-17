import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  findAll() {
    // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
    const result = [
      {
        name: '자바 칩 프라푸치노',
        price: 6100,
        kcal: 340,
        saturated_fat: 9,
        protein: 6,
        natrium: 180,
        sugar: 42,
        caffeine: 100,
      },
      {
        name: '카라멜 프라푸치노',
        price: 5600,
        kcal: 300,
        saturated_fat: 7,
        protein: 4,
        natrium: 190,
        sugar: 39,
        caffeine: 85,
      },
      {
        name: '화이트 초콜릿 모카 프라푸치노',
        price: 5700,
        kcal: 245,
        saturated_fat: 6,
        protein: 4,
        natrium: 140,
        sugar: 38,
        caffeine: 85,
      },
      {
        name: '바닐라 크림 프라푸치노',
        price: 4800,
        kcal: 200,
        saturated_fat: 6,
        protein: 4,
        natrium: 150,
        sugar: 28,
        caffeine: 0,
      },
      {
        name: '초콜릿 크림 칩 프라푸치노',
        price: 5700,
        kcal: 300,
        saturated_fat: 7,
        protein: 6,
        natrium: 160,
        sugar: 40,
        caffeine: 10,
      },
    ];

    // 2. DB에서 거내온 결과를 브라우저에 응답(response) 주기
    return result;
  }

  create({ createStarbucksInput }) {
    // 1. 브라우저에서 보내준 데이터 확인하기
    console.log(`
    name: '${createStarbucksInput.name}',
    price: ${createStarbucksInput.price},
    kcal: ${createStarbucksInput.kcal},
    saturated_fat: ${createStarbucksInput.saturated_fat},
    protein: ${createStarbucksInput.protein},
    natrium: ${createStarbucksInput.natrium},
    sugar: ${createStarbucksInput.sugar},
    caffeine: ${createStarbucksInput.caffeine}
    `);

    // 2. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
    //

    // 3. DB에 저장이 잘 됐으면 결과를 브라우저에 응답(response) 주기
    return '게시물 등록에 성공했습니다.';
  }
}
