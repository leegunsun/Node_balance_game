const LoginService = require("../services/login.service");
const bcrypt = require("bcrypt");
const Boom = require("boom");
// const CustomLogger = require("../config/custom_winston");
class LoginController {
  constructor() {
    this.loginService = new LoginService();
    // this.customLogger = new CustomLogger();
  }

  auth = async (req, res) => {
    const label = "login.controller.js";
    try {
      const { nickname, password } = req.body;

      const token = await this.loginService.auth({ nickname, password });

      const reToken = await this.loginService.refreshToken({ nickname });

      // res.cookie("authorization", `Bearer ${token}`, {
      //   httpOnly: false,
      //   sameSite: false,
      // });

      res.cookie("authorization", `Bearer ${token}`, {
        httpOnly: false,
        sameSite: false,
        domain: "http://43.201.20.151:3001",
        path: "/",
      });
      res.cookie("refreshToken", `Bearer ${reToken}`, {
        httpOnly: false,
        sameSite: false,
      });

      return res
        .status(201)
        .json({ success: true, message: "로그인에 성공하였습니다." });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error });
      if (Boom.isBoom(error)) {
        // this.customLogger.log(
        //   "error",
        //   label,
        //   error.output.payload.message,
        //   error.output.statusCode
        // );
        return res
          .status(error.output.statusCode)
          .json({ errorMessage: error.output.payload.message });
      } else {
        // this.customLogger.log("error", label, error.message, error.status);
        res
          .status(500)
          .json({ message: "요청한 데이터 형식이 올바르지 않습니다." });
      }
    }
  };
}

module.exports = LoginController;
