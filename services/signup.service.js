const SignupRepository = require("../repositories/signup.repository");

class SignupService {
  constructor() {
    this.signupRepository = new SignupRepository();
  }

  createUser = async (nickname, hashedPassword) => {
    // 회원가입 처리
    await this.signupRepository.createUser(nickname, hashedPassword);
    return;
  };
}

module.exports = SignupService;
