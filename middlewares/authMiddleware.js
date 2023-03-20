const LoginRepository = require("../repositories/login.repository");
const loginRepository = new LoginRepository();
const jwt = require('jsonwebtoken');
const Boom = require("boom");
// require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const {authorization, refreshToken } = req.cookies;
        const [authType, authToken] = (authorization ?? "").split(" ");
        const [reTokenType, reToken] = (refreshToken ?? "").split(" ");

        if (!refToken || !authType || authType !== "Bearer") {
            res.status(400).json({errorMessage: "로그인 후에 이용할 수 있는 기능입니다."});
            return;
          }

        if (!refToken) throw Boom.badRequest("Refresh Token이 존재하지 않습니다.");
        if (!authToken) throw Boom.badRequest("Access Token이 존재하지 않습니다.");
        
        const validatedAccessToken = validateAccessToken(authToken);
        const validatedRefreshToken = validateRefreshToken(reToken);

        if(!validatedRefreshToken) {
            throw Boom.unauthorized("Refresh Token이 만료되었습니다.");
        }
        if(!validatedAccessToken) {
            const user = await loginRepository.findByRefreshToken({refreshToken: reToken});
            if(!user.refreshToken) {
                throw Boom.unauthorized("Refresh Token이 서버에 존재하지 않습니다.");
            }
            const newAccessToken = jwt.sign(
                {userId: user.userId}, "Balance_Secret_Key", {expiresIn: "10m"}
            );
            res.cookie("authorization", `Bearer ${newAccessToken}`);
        }
        
        const {userId} = jwt.verify(authToken, "Balance_Secret_Key", {expiresIn: "10m"});
        const user = await loginRepository.findByUserId({userId});

        if(!user) {
            res.status(401).json({errorMessage: "사용자가 존재하지 않습니다."});
            return;
        }
        res.locals.user = user;
        next();
    } catch(error) {
        if (Boom.isBoom(error)) {
            res
              .status(error.output.statusCode)
              .json({ errorMessage: error.output.payload.message });
          } else {
            console.log(`message : ${error.output.payload.message}`);
            console.log(`statusCode : ${error.output.statusCode}`);
            res.status(400).json({ errorMessage: "로그인 후에 이용할 수 있는 기능입니다."});
          }
    }

    function validateAccessToken(authToken) {
        try {
            jwt.verify(authToken, "Balance_Secret_Key");
            return true;
        } catch(error) {
            return false;
        }
    }

    function validateRefreshToken(refToken) {
        try {
            jwt.verify(refToken, "Balance_Secret_Key2");
            return true;
        } catch(error) {
            return false;
        }
    }
}