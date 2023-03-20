const Users = require("../models");

class SignupRepository {
  // 닉네임 중복 검사 함수
  isExistingNickname = async (nickname) => {
    const user = await Users.findOne({ where: { nickname } });
    return !!user;
  };

  createUser = async (nickname, hashedPassword) => {
    const user = await Users.create({ nickname, password: hashedPassword });
    return user;
  };
}

module.exports = SignupRepository;
