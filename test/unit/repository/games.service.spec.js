const GamesService = require("../../../services/games.service");
const {
  FindAllGames,
  CreateGames,
  FindOneRenameGame,
} = require("../fixtures/games.fixtures");

const mockGamesRepository = {
  findAllGames: jest.fn(),
  findOneGame: jest.fn(),
  createGame: jest.fn(),
  findOneRenameGame: jest.fn(),
  deleteOneGame: jest.fn(),
};

describe("GamesService Layer Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("GamesService findAllGames Test", async () => {
    let gamesService = new GamesService();

    gamesService.gamesRepository = Object.assign({}, mockGamesRepository);

    gamesService.gamesRepository.findAllGames = jest.fn(() => FindAllGames);

    const testFinal = await gamesService.findAllGames();

    expect(testFinal).toBe(FindAllGames);
  });

  test("GamesRepository findOneGame Test", async () => {
    const gameId = { gameId: FindAllGames.gameId };

    let gamesService = new GamesService();

    gamesService.gamesRepository = Object.assign({}, mockGamesRepository);

    gamesService.gamesRepository.findOneRenameGame = jest.fn(
      () => FindOneRenameGame
    );

    const findOneGame = await gamesService.findOneGame(gameId);

    expect(findOneGame).toBe(FindOneRenameGame);
  });

  test("GamesRepository postGame Test", async () => {
    const gamesService = new GamesService();

    gamesService.gamesRepository = Object.assign({}, mockGamesRepository);

    gamesService.gamesRepository.createGame = jest.fn(() => CreateGames);

    const { title, optionA, optionB, UserId } = CreateGames;

    const createUser = await gamesService.postGame(
      title,
      optionA,
      optionB,
      UserId
    );

    expect(createUser).toBe(CreateGames);
  });

  test("GamesRepository deleteOneGame Test", async () => {
    const { gameId, UserId } = FindAllGames;

    const gamesService = new GamesService();
    gamesService.gamesRepository = Object.assign({}, mockGamesRepository);
    gamesService.gamesRepository.deleteOneGame = jest.fn(
      () => FindOneRenameGame
    );

    expect(gamesService.deleteOneGame(gameId, UserId)).toBe(FindOneRenameGame);
  });
});
