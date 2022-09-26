import { checkValidationEmail, getWelcomeTemplate, sendWelcomeTemplateToEmail } from "./email.js";

function createUser(user) {
  const isValid = checkValidationEmail(user.email);
  if (isValid) {
    const template = getWelcomeTemplate(user);

    sendWelcomeTemplateToEmail(user.email, template);
  }
}

const user = {
  name: "철수",
  age: 13,
  school: "다람쥐초등학교",
  email: "aaa@aaaa.com",
};

createUser(user);
