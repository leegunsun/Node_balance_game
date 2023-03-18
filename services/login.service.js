const LoginRepository = require("../repositories/login.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Boom = require("boom");
// require('dotenv').config();

class LoginService {
  constructor() {
    this.loginRepository = new LoginRepository();
  }

  auth = async ({ nickname, password }) => {
    const user = await this.loginRepository.getHashedPassword({ nickname });
    const hashedPassword = await user.password;

    const passwordVal = await bcrypt.compare(password, hashedPassword);

    if (user.nickname !== nickname) {
      const message = "닉네임을 확인해주세요.";
      return message;
    } else if (passwordVal) {
      const token = jwt.sign({ userId: user.userId }, "Balance_Secret_Key");
      return token;
    } else {
      throw Boom.unauthorized("비밀번호가 일치하지 않습니다.");
    }
  };
}

module.exports = LoginService;
