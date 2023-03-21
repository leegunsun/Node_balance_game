const SignupRepository = require("../repositories/signup.repository");

class SignupService {
  constructor() {
    this.signupRepository = new SignupRepository();
  }

  createUser = async (nickname, hashedPassword) => {
    // 회원가입 처리

    const createUser = await this.signupRepository.createUser(
      nickname,
      hashedPassword
    );

    return createUser;
  };

  isExistingNickname = async (nickname) => {
    const isExist = await this.signupRepository.isExistingNickname(nickname);

    return isExist;
  };
}

module.exports = SignupService;
