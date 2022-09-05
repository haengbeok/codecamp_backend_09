import axios from "axios";
// 1. 비동기 방식
function fetchPostAsync() {
  const result = axios.get("https://koreanjson.com/posts/1");
  console.log("비동기 방식: ", result); // Promise { <pending> }
}

fetchPostAsync();

// 2. 동기 방식
async function fetchPostSync() {
  const result = await axios.get("https://koreanjson.com/posts/1");
  console.log("동기 방식: ", result.data); // 정상적인 데이터
}

fetchPostSync();
