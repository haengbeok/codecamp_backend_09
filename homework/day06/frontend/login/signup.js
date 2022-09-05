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

// 회원 가입 API 요청
const submitSignup = async () => {
  console.log("회원 가입 이메일 전송");

  const myPhone1 = document.getElementById("PhoneNumber01").value;
  const myPhone2 = document.getElementById("PhoneNumber02").value;
  const myPhone3 = document.getElementById("PhoneNumber03").value;
  const myPhone = myPhone1 + myPhone2 + myPhone3;

  const userData = {
    name: document.getElementById("SignupName").value,
    rrn: document.getElementById("SignupPersonal").value,
    phone: myPhone,
    favoriteSite: document.getElementById("SignupPrefer").value,
    pass: document.getElementById("SignupPwd").value,
    email: document.getElementById("SignupEmail").value,
  };

  axios.post("http://localhost:3000/users", userData).then((res) => {
    return res.userData;
  });
};
