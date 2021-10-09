const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
app.use(morgan("dev"));

const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const path = require("path");
const hbs = require("express-handlebars");
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.engine(
    "hbs",
    hbs({
      extname: "hbs",
      defaultLayout: "layout",
      layoutsDir: __dirname + "/views/layouts/",
    })
  );
  app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cookieParser());

app.use(
    expressSession({
      secret: "somethingSecret",
      saveUninitialized: false,
      resave: false,
    })
  );

  mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB is connected 😎"))
  .catch((error) => {
    console.log(`There was a problem ${error.message}`);
  });

app.use("/uploads", express.static("uploads"));

const auth = require("./routes/auth");
app.use("/", auth);
const users = require("./routes/users");
app.use("/users", users);
const user = require("./routes/user");
app.use("/user", user);

  module.exports = app;
