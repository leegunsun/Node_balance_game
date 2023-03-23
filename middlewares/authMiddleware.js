const LoginRepository = require("../repositories/login.repository");
// const CustomLogger = require("../config/custom_winston");
const loginRepository = new LoginRepository();
const jwt = require("jsonwebtoken");
const Boom = require("boom");
// require('dotenv').config();

function validateAccessToken(authToken) {
  try {
    jwt.verify(authToken, "Balance_Secret_Key");
    return true;
  } catch (error) {
    return false;
  }
}

function validateRefreshToken(reToken) {
  try {
    jwt.verify(reToken, "Balance_Secret_Key2");
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = async (req, res, next) => {
  // this.customLogger = new CustomLogger();

  const label = "authMiddleware.js";

  try {
    // const { authorization, refreshToken } = req.cookies; //쿠키사용

    const authorization = req.headers.authorization; //서버
    // const refreshToken = req.headers.refreshToken; //서버/

    //로그인 하면 헤더 값을 읽어서 세션 스토리지에 저장
    const [authType, authToken] = (authorization ?? "").split(" ");
    // const [reTokenType, reToken] = (refreshToken ?? "").split(" ");
    console.log(authToken);
    if (!authType || authType !== "Bearer") {
      res
        .status(400)
        .json({ errorMessage: "로그인 후에 이용할 수 있는 기능입니다." });
      return;
    }

    // if (!reToken) throw Boom.badRequest("Refresh Token이 존재하지 않습니다.");
    if (!authToken) throw Boom.badRequest("Access Token이 존재하지 않습니다.");

    const validatedAccessToken = validateAccessToken(authToken);

    // const validatedRefreshToken = validateRefreshToken(reToken);

    // if (!validatedRefreshToken) {
    //   throw Boom.unauthorized("Refresh Token이 만료되었습니다.");
    // }
    if (!validatedAccessToken) {
      // const user = await loginRepository.findByRefreshToken({
      //   refreshToken: reToken,
      // });
      // if (!user.refreshToken) {
      //   throw Boom.unauthorized("Refresh Token이 서버에 존재하지 않습니다.");
      // }
      const newAccessToken = jwt.sign(
        { userId: user.userId },
        "Balance_Secret_Key",
        { expiresIn: "10d" }
      );
      res.cookie("authorization", `Bearer ${newAccessToken}`, {
        httpOnly: false,
        sameSite: false,
      });
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
      // this.customLogger.log(
      //   "error",
      //   label,
      //   error.output.payload.message,
      //   error.output.statusCode
      // );
      res
        .status(error.output.statusCode)
        .json({ errorMessage: error.output.payload.message });
    } else {
      // this.customLogger.log("error", label, error.message, error.status);
      res
        .status(400)
        .json({ errorMessage: "전달된 쿠키에서 오류가 발생하였습니다." });
    }
  }
};
