const SignupService = require("../services/signup.service");

app.post('/api/signup', (req, res) => {
    const { nickname, password, confirmPassword } = req.body;
  
    // 닉네임의 형식이 비정상적인 경우
    if (!/^[a-zA-Z0-9]{4,16}$/.test(nickname)) {
      return res.status(412).json({ errorMessage: "닉네임의 형식이 일치하지 않습니다." });
    }
  
    // 패스워드 형식이 비정상적인 경우
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(password)) {
      return res.status(412).json({ errorMessage: "패스워드 형식이 일치하지 않습니다." });
    }
  
    // 패스워드에 닉네임이 포함되어 있는 경우
    if (password.includes(nickname)) {
      return res.status(412).json({ errorMessage: "패스워드에 닉네임이 포함되어 있습니다." });
    }
  
    // 패스워드와 패스워드 확인이 일치하지 않는 경우
    if (password !== confirmPassword) {
      return res.status(412).json({ errorMessage: "패스워드가 일치하지 않습니다." });
    }
  
    // 닉네임이 중복된 경우
    if (existingNickname(nickname)) {
      return res.status(412).json({ errorMessage: "중복된 닉네임입니다." });
    }
  
    // 회원가입에 성공한 경우
    res.status(201).json({ message: "회원 가입에 성공하였습니다." });
  });
  
  // 기존 닉네임 확인 함수
  function existingNickname(nickname) {
    return false; // 임시로 false 반환
  }
  
  module.exports = SignupController;