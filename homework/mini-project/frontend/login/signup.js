// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  console.log("인증 번호 전송");

  const myPhone1 = document.getElementById("PhoneNumber01").value;
  const myPhone2 = document.getElementById("PhoneNumber02").value;
  const myPhone3 = document.getElementById("PhoneNumber03").value;
  const myPhone = myPhone1 + myPhone2 + myPhone3;

  axios
    .post("http://localhost:3000/tokens/phone", {
      myPhone: myPhone,
    })
    .then((res) => {
      return res;
    });
};

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  const inputToken = document.getElementById("TokenInput").value;

  await axios
    .patch("http://localhost:3000/tokens/phone", {
      token: inputToken,
    })
    .then((res) => {
      return res;
    });
  console.log("핸드폰 인증 완료");
};

// 회원 가입 API 요청
const submitSignup = async () => {
  console.log("회원 가입 완료");

  const myPhone1 = document.getElementById("PhoneNumber01").value;
  const myPhone2 = document.getElementById("PhoneNumber02").value;
  const myPhone3 = document.getElementById("PhoneNumber03").value;
  const myPhone = myPhone1 + myPhone2 + myPhone3;

  const myPersonal1 = document.getElementById("SignupPersonal1").value;
  const myPersonal2 = document.getElementById("SignupPersonal2").value;
  const myPersonal = myPersonal1 + "-" + myPersonal2;

  const userData = {
    name: document.getElementById("SignupName").value,
    email: document.getElementById("SignupEmail").value,
    personal: myPersonal,
    prefer: document.getElementById("SignupPrefer").value,
    pwd: document.getElementById("SignupPwd").value,
    phone: myPhone,
  };

  await axios.post("http://localhost:3000/user", userData).then((res) => {
    return res.userData;
  });
};
