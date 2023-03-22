const GamesController = require("../../../controllers/games.controller");

const mockGamesService = {
  findAllGames: jest.fn(),
  findOneGame: jest.fn(),
  postGame: jest.fn(),
  deleteOneGame: jest.fn(),
};

const mockReq = {};

const mockRes = {};
