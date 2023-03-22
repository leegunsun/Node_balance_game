const { Users } = require("../models");

class LogoutRepository {
    deleteToken = async (userId) =>  {
        await Users.destroy({ where: { userId: userId }, attributes: ['refreshToken'] });
    }
}

module.exports = LogoutRepository;