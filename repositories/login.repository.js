const { Users } = require("../models");
const { Op } = require("sequelize");

class LoginRepository {
  constructor() {}

  getHashedPassword = async ({ nickname, password }) => {
    const user = await Users.findOne({
      where: { nickname: nickname },
    });

    return user;
  };

  findByUserId = async ({ userId }) => {
    const user = await Users.findOne({
      where: { userId },
    });
    return user;
  };

  findByRefreshToken = async ({ refreshToken }) => {
    const user = await Users.findOne({
      where: { refreshToken },
    });
    return user;
  };

  refreshToken = async ({ nickname }, reToken) => {
    const UpdaterefreshToken = await Users.update(
      { refreshToken: reToken },
      {
        where: { nickname: nickname },
        returning: true,
      }
    );
    return UpdaterefreshToken;
  };
}

module.exports = LoginRepository;
