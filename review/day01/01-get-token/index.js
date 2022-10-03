function getToken(count) {
  const result = String(Math.ceil(Math.random() * 10 ** count)).padStart(count, "0");
  const result2 = String(Math.floor(Math.random() * 10 ** count)).padStart(count, "0");

  console.log(result);
  console.log(result2);
  return result, result2;
}

getToken(4);
getToken(6);
getToken(8);
