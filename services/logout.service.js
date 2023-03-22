const LogoutRepository = require("../repositories/logout.repository");

class LogoutService {
  logoutRepository = new LogoutRepository();

  updateToken = async (userId) => {
    await this.logoutRepository.updateToken(userId);
  };
}

module.exports = LogoutService;
