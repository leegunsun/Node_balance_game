const LikesRepository = require("../repositories/likes.repository");

class LikesService {
  constructor() {
    this.likesRepository = new LikesRepository();
  }
}

module.exports = LikesService;
