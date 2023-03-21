const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { sequelize } = require("./models/index.js");
const {
  errorHandler,
  errorLogger,
} = require("./middlewares/error-handler.middleware");

const indexRouter = require("./routes/index");

const port = 3001;

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize 연결 성공!");
  })
  .catch((err) => {
    console.error("Sequelize 연결 실패:", err);
  });

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: ["authorization"],
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api", indexRouter);

app.use(errorLogger); // Error Logger
app.use(errorHandler); // Error Handler

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});

//test
// "nickname":"qwer",
// "password":"1234512345aA!",

