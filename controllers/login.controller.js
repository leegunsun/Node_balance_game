const LoginService = require("../services/login.service");
const bcrypt = require("bcrypt");
const Boom = require("boom");

class LoginController {
  constructor() {
    this.loginService = new LoginService();
  }

  auth = async (req, res) => {
    try {
      const { nickname, password } = req.body;

      const token = await this.loginService.auth({ nickname, password });

      res.cookie("authorization", `Bearer ${token}`);
      return res
        .status(201)
        .json({ success: true, message: "로그인에 성공하였습니다." });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error });
      if (Boom.isBoom(error)) {
        res
          .status(error.output.statusCode)
          .json({ errorMessage: error.output.payload.message });
      } else {
        res
          .status(500)
          .json({ message: "요청한 데이터 형식이 올바르지 않습니다." });
      }
    }
  };
}

module.exports = LoginController;
