const LogoutRepository = require("../repositories/logout.repository");

class LogoutService {
    logoutRepository = new LogoutRepository();

    deleteToken = async (userId) => {
        await this.logoutRepository.deleteToken(userId);
    }
}

module.exports = LogoutService;