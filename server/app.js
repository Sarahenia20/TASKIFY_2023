var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { default: mongoose } = require("mongoose");
/* routers */
const authRouter = require("./routes/auth.router");
const usersRouter = require("./routes/users.router");
const roleRouter = require("./routes/roles.router");
const fakeRouter = require("./routes/faker.router");
const tasksRouter = require("./routes/tasks.router");
const commentsRouter = require("./routes/comments.router");
const passport = require("passport");

require("dotenv").config();
var app = express();

require("./middlewares/passport-jwt")(passport);
mongoose
  .connect(process.env.MONGO_URI)
  .then((cnn) =>
    console.log(
      "Connected to DataBase successfully !!",
      cnn.connections[0].host,
      
    )
  )
  .catch((err) => console.log(err));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", [
  authRouter,
  usersRouter,
  roleRouter,
  fakeRouter,
  tasksRouter,
  commentsRouter,
]);

module.exports = app;
