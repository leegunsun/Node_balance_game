const bcrypt = require("bcrypt");
const {
  isExistingNickname,
  signup,
} = require("../repositories/signup.repository");
const Boom = require("boom");

exports.signupUser = async (nickname, password, confirmPassword) => {
  try {
    // 닉네임 중복 검사
    if (await isExistingNickname(nickname)) {
      throw Boom.conflict("중복된 닉네임입니다.");
    }

    // 닉네임 형식 검사
    if (!/^[a-zA-Z0-9]{4,16}$/.test(nickname)) {
      throw Boom.preconditionFailed("닉네임의 형식이 일치하지 않습니다.");
    }

    // 패스워드 형식 검사
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        password
      )
    ) {
      throw Boom.preconditionFailed("패스워드 형식이 일치하지 않습니다.");
    }

    // 패스워드와 확인 패스워드 일치 검사
    if (password !== confirmPassword) {
      throw Boom.preconditionFailed("패스워드가 일치하지 않습니다.");
    }

    // 패스워드에 닉네임 포함 검사
    if (password.includes(nickname)) {
      throw Boom.preconditionFailed("패스워드에 닉네임이 포함되어 있습니다.");
    }

    // 패스워드 암호화
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // 회원가입 처리
    await signup(nickname, hashedPassword);

    return { message: "회원 가입에 성공하였습니다." };
  } catch (err) {
    if (Boom.isBoom(err)) {
      throw err;
    } else {
      console.error(err);
      throw Boom.badImplementation("서버 에러가 발생하였습니다.");
    }
  }
};
