const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const { sequelize } = require("./models/index.js");

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

app.use("/api", indexRouter);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
