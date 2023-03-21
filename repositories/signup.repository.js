const { Users } = require("../models");

class SignupRepository {
  // 닉네임 중복 검사 함수
  isExistingNickname = async (nickname) => {
    const user = await Users.findOne({ where: { nickname: nickname } });

    return !!user;
  };

  createUser = async (nickname, hashedPassword) => {
    const user = await Users.create({
      password: hashedPassword,
      nickname: nickname,
    });
    console.log(nickname);
    console.log(hashedPassword);
    console.log(user);
    return user;
  };
}

module.exports = SignupRepository;
