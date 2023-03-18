const logger = require("./config/winston");

class CustomLogger {
  constructor() {}

  log(level, message, label, userId, gameId) {
    logger.log({
      level: level,
      message: message,
      label: label,
      userId: userId,
      gameId: gameId,
    });
  }
}

module.exports = CustomLogger;
