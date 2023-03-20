const LoginRepository = require("../repositories/login.repository");
const CustomLogger = require("../config/custom_winston");
const loginRepository = new LoginRepository();
const jwt = require("jsonwebtoken");
const Boom = require("boom");
// require('dotenv').config();

module.exports = async (req, res, next) => {
  const label = "authMiddleware.js";
  try {
    const { authorization } = req.cookies;
    const [authType, authToken] = (authorization ?? "").split(" ");

    if (authType !== "Bearer" || !authToken) {
      res
        .status(400)
        .json({ errorMessage: "로그인 후에 이용할 수 있는 기능입니다." });
      return;
    }

    const { userId } = jwt.verify(authToken, "Balance_Secret_Key");
    const user = await loginRepository.findByUserId({ userId });

    if (!user) {
      res.status(401).json({ errorMessage: "사용자가 존재하지 않습니다." });
      return;
    }
    res.locals.user = user;
    next();
  } catch (error) {
    if (Boom.isBoom(error)) {
      res
        .status(error.output.statusCode)
        .json({ errorMessage: error.output.payload.message });
    } else {
      this.customLogger.log("error", label, error.message, error.status);
      res
        .status(400)
        .json({ errorMessage: "전달된 쿠키에서 오류가 발생하였습니다." });
    }
  }
};
