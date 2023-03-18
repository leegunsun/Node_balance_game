const { Users } = require("../models");
const { Op } = require("sequelize");

class LoginRepository {
    constructor () {}

    auth = async({nickname, password}) => {
        const user = await Users.findOne({
            where: {
                [Op.and] : [{nickname}, {password}]
            }
        })
        return user;
    }

    findByUserId = async({userId}) => {
        const user = await Users.findOne({
            where: {userId}
        })
        return user;
    }
}

module.exports = LoginRepository;