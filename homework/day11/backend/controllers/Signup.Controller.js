import { customRegistrationNumber } from "./services/rrn.js";
import { SendEmail } from "./services/email.js";
import { getOpenGraph } from "./services/og.js";
import { Token } from "../models/token.model.js";
import { User } from "../models/user.model.js";

export class SignupController {
  checkInfo = async (req, res) => {
    // 1. 브라우저에서 보내준 데이터 확인하기
    console.log(req.body);

    // 2. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
    // console.log(await Token.findOne({ isAuth: false }));

    if (await Token.findOne({ isAuth: false })) {
      res.status(422).send("인증되지않았습니다.");
    } else {
      const rrn = req.body.personal;
      let result = customRegistrationNumber(rrn);

      const { name, phone, email } = req.body;
      const sendEmail = new SendEmail();
      const isValid = sendEmail.checkEmail(email);
      if (isValid === false) return;
      const mytemplate = sendEmail.getWelcomeTemplate({ name, phone, email });
      sendEmail.sendTemplateToEmail(email, mytemplate);

      const og_data = await getOpenGraph(req.body.prefer);
      console.log(og_data);

      const user = new User({
        name: req.body.name,
        email,
        personal: result,
        prefer: req.body.prefer,
        pwd: req.body.pwd,
        phone: req.body.phone,
        og: og_data,
      });
      await user.save();

      // 3. DB에 저장이 잘 됐으면 결과를 브라우저에 응답(response) 주기
      res.send(user._id);
    }
  };

  userList = async function (req, res) {
    // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
    const result = await User.find();

    // 2. DB에서 거내온 결과를 브라우저에 응답(response) 주기
    res.send(result);
  };
}
