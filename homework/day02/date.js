const date = new Date();
const yyyy = date.getFullYear();
const mm = date.getMonth() + 1;
const dd = date.getDate();
const hours = date.getHours();
const min = date.getMinutes();
const sec = date.getSeconds();
const result = `오늘은 ${yyyy}년 ${mm}월 ${dd}일 ${hours}:${min}:${sec} 입니다`;

console.log(result);
