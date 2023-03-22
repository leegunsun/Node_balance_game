const LoginService = require("../../../services/login.service");

const mockLoginRepository = {
  auth: jest.fn(),
  refreshToken: jest.fn(),
};

const mockReq = {};

const mockRes = {};

describe("LoginService Layer Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("LoginService findAllGames Test");
});
