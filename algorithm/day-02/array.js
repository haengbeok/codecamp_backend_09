const obj = {
  name: "철수",
  age: 12,
  school: {
    name: "다람쥐 초등학교",
  },
};

// dot notation
obj.name;
obj.age;
obj.school;

// bracket notation
let name = "age";
obj[name]; // 문자열로 감싸주는 이유
obj["name"];
obj["age"];
