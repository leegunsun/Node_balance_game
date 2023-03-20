
const bcrypt = require("bcrypt");
const Boom = require("boom");
const SignupService = require("../services/signup.service");
const SignupRepository = require("../repositories/signup.repository");
// const CustomLogger = require("../config/custom_winston");


class SignupController {
  constructor() {
    this.signupRepository = new SignupRepository();
    this.signupService = new SignupService();
    // this.customLogger = new CustomLogger();
  }

  createUser = async (req, res, next) => {
    const { nickname, password, confirmPassword } = req.body;
    const label = "singup.controller.js";

    try {
      // 닉네임 중복 검사
      if (await this.signupRepository.isExistingNickname(nickname)) {
        throw Boom.conflict("중복된 닉네임입니다.");
      }
      console.log(
        "await this.signupRepository.isExistingNickname(nickname) ",
        await this.signupRepository.isExistingNickname(nickname)
      );

      // 닉네임 형식 검사
      if (!/^[a-zA-Z0-9]{4,16}$/.test(nickname)) {
        throw Boom.preconditionFailed("닉네임의 형식이 일치하지 않습니다.");
      }
      console.log(
        "!/^[a-zA-Z0-9]{4,16}$/.test(nickname) ",
        !/^[a-zA-Z0-9]{4,16}$/.test(nickname)
      );

      // 패스워드 형식 검사
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
          password
        )
      ) {
        throw Boom.preconditionFailed("패스워드 형식이 일치하지 않습니다.");
      }
      console.log(
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
          password
        )
      );

      // 패스워드와 확인 패스워드 일치 검사
      if (password !== confirmPassword) {
        throw Boom.preconditionFailed("패스워드가 일치하지 않습니다.");
      }
      console.log("password !== confirmPassword", password !== confirmPassword);

      // 패스워드에 닉네임 포함 검사
      if (password.includes(nickname)) {
        throw Boom.preconditionFailed("패스워드에 닉네임이 포함되어 있습니다.");
      }
      console.log("password.includes(nickname)", password.includes(nickname));

      // 패스워드 암호화
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      console.log("salt", salt);
      console.log("hashedPassword", hashedPassword);
      // 회원가입 처리
      await this.signupService.createUser(nickname, hashedPassword);
      console.log(
        "await this.signupService.createUser(nickname, hashedPassword)",
        await this.signupService.createUser(nickname, hashedPassword)
      );

      return res.status(201).json({ message: "회원 가입에 성공하였습니다." });
    } catch (err) {
      if (Boom.isBoom(err)) {
        // this.customLogger.log(
        //   "error",
        //   label,
        //   err.output.payload.message,
        //   err.output.statusCode
        // );
        return res
          .status(err.output.statusCode)
          .json({ errorMessage: err.output.payload.message });
      } else {
        // this.customLogger.log("error", label, err.message, err.status);
        return res
          .status(500)
          .json({ errorMessage: "서버 에러가 발생하였습니다." });
      }
    }
  };
}

module.exports = SignupController;
