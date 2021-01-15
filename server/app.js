const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const connectDB = require('./db');
const handleErrors = require('./middleware/handleErrors');
const verifyAuth = require('./middleware/verifyAuth'); //Middleware to verify JWT tokens
const validateBody = require('./middleware/validateBody');

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const pingRouter = require("./routes/ping");
const registerRouter = require("./routes/register");
const uploadRouter = require("./routes/upload");

const { json, urlencoded } = express;
const validateEntryReq = validateBody.entry;

var app = express();

//Connect to MongoDB
connectDB();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/login", validateEntryReq, loginRouter);
app.use("/ping", pingRouter);
app.use("/register", validateEntryReq, registerRouter);
app.use("/upload", uploadRouter);

app.use(handleErrors);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});


module.exports = app;
