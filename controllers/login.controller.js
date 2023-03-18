const LoginService = require("../services/login.service");
const Boom = require("boom");

class LoginController {
    constructor() {
        this.loginService = new LoginService();
    }

    auth = async (req, res) => {
        try {
            const {nickname, password} = req.body;      

            const token = await this.loginService.auth({nickname, password});
            res.cookie("authorization", `Bearer ${token}`);
            return res.status(201).json({success:true, message: "로그인에 성공하였습니다." });
        } catch (error) {
            if (Boom.isBoom(error)) {
                res
                  .status(error.output.statusCode)
                  .json({ errorMessage: error.output.payload.message });
              } else {
                console.log(`message : ${error.output.payload.message}`);
                console.log(`statusCode : ${error.output.statusCode}`);
                res.status(400).json({ errorMessage: "로그인에 실패하였습니다." });
              }
        }
    }   
};

module.exports = LoginController;
