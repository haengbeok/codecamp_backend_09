const date = new Date();
const yyyy = date.getFullYear();
const mm = String(date.getMonth() + 1).padStart(2, "0");
const dd = String(date.getDate()).padStart(2, "0");
const hours = date.getHours();
const min = String(date.getMinutes()).padStart(2, "0");
const sec = String(date.getSeconds()).padStart(2, "0");
const result = `오늘은 ${yyyy}년 ${mm}월 ${dd}일 ${hours}:${min}:${sec} 입니다`;

console.log(result);
