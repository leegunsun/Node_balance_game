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
    console.log(hashedPassword);

    const passwordVal = await bcrypt.compare(password, hashedPassword);

    if (user.nickname !== nickname) {
      const message = "닉네임을 확인해주세요.";
      return message;
    } else if (passwordVal) {
      const token = jwt.sign({ userId: user.userId }, "Balance_Secret_Key", {
        expiresIn: "10m",
      });
      return token;
    } else {
      throw Boom.unauthorized("비밀번호가 일치하지 않습니다.");
    }
  };

  refreshToken = async (nickname) => {
    const reToken = jwt.sign({}, "Balance_Secret_Key2", { expiresIn: "7d" });

    const addRefreshToken = await this.loginRepository.refreshToken(
      nickname,
      reToken
    );
    addRefreshToken;
    return reToken;
  };
}

module.exports = LoginService;
