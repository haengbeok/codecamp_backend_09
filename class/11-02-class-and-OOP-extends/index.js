// class Date {
//     getFullYear(){

//     }

//     getMonth(){

//     }
// }

const aaa = new Date();
console.log(aaa.getFullYear());
console.log(aaa.getMonth() + 1);

class Monster {
  power = 10;

  constructor(aaa) {
    this.power = aaa;
  }

  attack = () => {
    console.log("공격하자!!");
    console.log("내 공격력은 " + this.power + "야!!!");
  };
}

class 공중몬스터 extends Monster {
  constructor() {
    super(qqq);
  }

  run = () => {
    console.log("날아서 도망가자");
  };
}

class 지상몬스터 extends Monster {
  constructor() {
    super(www);
  }

  run = () => {
    console.log("뛰어서 도망가자");
  };
}

const mymonster1 = new 공중몬스터(20);
mymonster1.attack();
mymonster1.run();

const mymonster2 = new 지상몬스터(50);
mymonster2.attack();
mymonster2.run();
