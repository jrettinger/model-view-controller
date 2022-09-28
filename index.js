const PORT = process.env.PORT || 3001;

const sequelize = require("sequelize");
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
require("dotenv").config();
const flash = require("connect-flash");
const session = require("express-session");

// Handlebars
var handlebars = exphbs.create();
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/views"));

// Express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  })
);

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.error_msg = req.flash("error_msg");
  res.locals.user = req.user;
  res.locals.isLoggedIn = req.session.userId ? true : false;
  next();
});

// LOGIN PAGE ROUTE
app.get("/login", function (req, res) {
  if (req.session.userId) {
    res.redirect("/");
    return false;
  } else {
    res.render("login");
  }
});

// REGISTER PAGE ROUTE
app.get("/register", function (req, res) {
  if (req.session.userId) {
    res.redirect("/");
    return false;
  } else {
    res.render("register");
  }
});

// ADDPOST PAGE ROUTE
app.get("/addPost", function (req, res) {
  if (req.session.userId) {
    res.render("addPost");
  } else {
    res.redirect("/login");
    return false;
  }
});

const homeRouter = require("./routes/home");
const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");
const commentRouter = require("./routes/comment");

app.use("/", homeRouter);
app.use("/", blogRouter);
app.use("/", userRouter);
app.use("/", commentRouter);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
