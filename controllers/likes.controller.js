const LikesService = require("../services/likes.service");

class LikesController {
  constructor() {
    this.likesService = new LikesService();
  }
}

module.exports = LikesController;
