const LoginService = require("../../../services/login.service");

const mockLoginRepository = {
  auth: jest.fn(),
  refreshToken: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

describe("LoginService Layer Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("LoginService findAllGames Test");
});
