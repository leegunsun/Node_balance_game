const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

const { sequelize } = require("./models/index.js");
const {
  errorHandler,
  errorLogger,
} = require("./middlewares/error-handler.middleware");

const indexRouter = require("./routes/index");

const port = 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize 연결 성공!");
  })
  .catch((err) => {
    console.error("Sequelize 연결 실패:", err);
  });

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "*", // 저희 빽 배포 주소 -> 프론트에 맞춰야한다
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api", indexRouter);

app.use(errorLogger); // Error Logger
app.use(errorHandler); // Error Handler

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});

//test
// "nickname":"qwer",
// "password":"1234512345aA!",
