const LogoutService = require("../services/logout.service");

class LogoutController {
    logoutService = new LogoutService();

    deleteToken = async (req, res, next) => {
        try {
          const { userId } = res.locals.user;
          
          if (!userId) {
            throw new InvalidParamsError();
          }
          await this.commentsService.deleteToken(userId);
          res.status(200).json({ message: "로그아웃 되었습니다" });
        } catch (error) {
          next(error);
        }
      };
}

module.exports = LogoutController;