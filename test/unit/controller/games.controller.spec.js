const GamesController = require("../../../controllers/games.controller");
const {
  createPostGameInsertSchemaByController,
} = require("../fixtures/games.fixtures");

const mockGamesService = () => ({
  findAllGames: jest.fn(),
  findOneGame: jest.fn(),
  postGame: jest.fn(),
  deleteOneGame: jest.fn(),
});

const mockRequest = {
  body: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

describe("GamesController Layer Test", () => {
  const gamesController = new GamesController();
  gamesController.gamesService = mockGamesService();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("GamesController postGame Test", async () => {
    mockRequest.body = createPostGameInsertSchemaByController;
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });

    await gamesController.postGame(mockRequest, mockResponse);

    expect(gamesController.gamesService.postGame).toHaveBeenCalledTimes(1);
  });
});
