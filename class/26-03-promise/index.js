// .then() 으로 받기
const onClickPromiseThen = () => {
  new Promise((resolve, reject) => {
    // 시간이 걸리는 작업(API 보내기 등)
    // ...
    // ...
    // ...
    setTimeout(() => {
      const result = "철수"; // 2초 걸려서 백엔드에서 '철수' 데이터 받아옴
      resolve(result); // 성공하면 이거 실행
      //   reject("에러 발생"); // 실패하면 이거 실행 => try-catch 에서 실패시 사용하기
    }, 2000);
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err); // 에러 발생
    });
};

onClickPromiseThen();

// await로 받기
const onClickPromiseAwait = async () => {
  const qqq = await new Promise((resolve, reject) => {
    // 시간이 걸리는 작업(API 보내기 등)
    // ...
    // ...
    // ...
    setTimeout(() => {
      const result = "철수"; // 2초 걸려서 백엔드에서 '철수' 데이터 받아옴
      resolve(result); // 성공하면 이거 실행
      //   reject("에러 발생"); // 실패하면 이거 실행 => try-catch 에서 실패시 사용하기
    }, 2000);
  });
  console.log(qqq);
};

onClickPromiseAwait();
