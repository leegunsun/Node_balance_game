const SignupRepository = require("../repositories/signup.repository");

class SignupService {
  constructor() {
    this.signupRepository = new SignupRepository();
  }

  findAllSignup = async () => {
    const findAllSignup = await this.signupRepository.findAllSignup();

    return findAllSignup;
  };
}

module.exports = SignupService;
