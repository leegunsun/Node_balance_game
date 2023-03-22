const { Users } = require("../models");

class LogoutRepository {
  updateToken = async (userId) => {
    await Users.update({ refreshToken: "" }, { where: { userId: userId } });
  };
}

module.exports = LogoutRepository;
