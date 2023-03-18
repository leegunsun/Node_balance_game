const { Users } = require("../models");
const { Op } = require("sequelize");

class LoginRepository {
  constructor() {}

  getHashedPassword = async ({ nickname, password }) => {
    const user = await Users.findOne({
      where: { nickname },
    });
    return user;
  };

  findByUserId = async ({ userId }) => {
    const user = await Users.findOne({
      where: { userId },
    });
    return user;
  };
}

module.exports = LoginRepository;
