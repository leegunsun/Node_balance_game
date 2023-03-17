const Boom = require("boom");

const Boomtest = (req, res, next) => {
  try {
    ("아래 throw가 실행되면 붐을 실행합니다.");
    throw Boom.badRequest("badRequest는 status404입니다");
  } catch (error) {
    if (Boom.isBoom(error)) {
      res
        .status(error.output.statusCode) // badRequest는 404이므로 404 statusCode를 반환합니다.
        .json({ errorMessage: error.output.payload.message }); // 에러 메시지를 설정하면 이쪽으로 빠집니다.
    } else {
      res
        .status(500) // 설정하지 않은 에러는 500를 반환합니다.
        .json({ errorMessage: "설정하지 않은 에러는 여기로 빠집니다." });
    }
  }
};

Boomtest();

// - `Boom.badRequest()` (400)
// - `Boom.unauthorized()` (401)
// - `Boom.forbidden()` (403)
// - `Boom.notFound()` (404)
// - `Boom.methodNotAllowed()` (405)
// - `Boom.notAcceptable()` (406)
// - `Boom.conflict()` (409)
// - `Boom.resourceGone()` (410)
// - `Boom.lengthRequired()` (411)
// - `Boom.preconditionFailed()` (412)
// - `Boom.entityTooLarge()` (413)
// - `Boom.uriTooLong()` (414)
// - `Boom.unsupportedMediaType()` (415)
// - `Boom.rangeNotSatisfiable()` (416)
// - `Boom.expectationFailed()` (417)
// - `Boom.teapot()` (418)
// - `Boom.badData()` (422)
// - `Boom.locked()` (423)
// - `Boom.failedDependency()` (424)
// - `Boom.preconditionRequired()` (428)
// - `Boom.tooManyRequests()` (429)
// - `Boom.illegal()` (451)
// - `Boom.badImplementation()` (500)
