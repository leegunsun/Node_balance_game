const LoginRepository = require("../repositories/login.repository");
const jwt = require('jsonwebtoken');
// require('dotenv').config();

class LoginService {
    constructor () {
        this.loginRepository = new LoginRepository();
    }

    auth = async ({nickname, password}) => {
        const user = await this.loginRepository.auth({nickname, password});
        if(user.nickname !== nickname) {
            res.status(401).json({errorMessage: "닉네임을 확인해주세요."});
            return;
        } else if (user.password !== password) {
            res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
            return;
        }
        const token = jwt.sign({userId: user.userId}, "Balance_Secret_Key");
        return token;
    }
};

module.exports = LoginService;