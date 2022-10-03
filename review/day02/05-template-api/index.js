import { checkEmail, getTemplate, sendTemplateToEmail } from "./email.js";

function createUser(user) {
  const isValid = checkEmail(user.email);
  if (isValid) {
    const template = getTemplate(user);

    sendTemplateToEmail(user.email, template);
  }
}

const user = {
  name: "철수",
  age: 13,
  school: "다람쥐초등학교",
  email: "aaa@aaa.com",
};

createUser(user);
