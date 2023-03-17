const GamesService = require("../../../services/games.service");
const FindAllGames = require("../fixtures");

const mockGamesRepository = () => ({
  findAllGames: jest.fn(),
});

let mockRequest = {
  body: jest.fn(),
};

let mockResponse = {
  status: jest.fn(() => mockResponse),
  json: jest.fn(),
};

describe("GamesRepository Layer Test", () => {
  let gamesService = new GamesService();
  gamesService.gamesRepository = mockGamesRepository();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("GamesRepository findAllGames Test", async () => {
    mockRequest.body = jest.fn(() => {});

    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });

    mockResponse.json = jest.fn(() => {
      return "success";
    });

    await gamesService.findAllGames();

    expect();
  });
});
