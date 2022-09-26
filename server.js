const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
require("dotenv").config();
const flash = require("connect-flash");
const session = require("express-session");

process.env.PORT || 3001;

// Handlebars
var hbs = exphbs.create();
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/views"));

// Express session
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
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


const bodyParser = require("body-parser");
app.use(
    bodyParser.urlencoded({
        extended: true,
        parameterLimit: 100000,
        limit: "500mb",
    })
);
app.use(bodyParser.json());


const homeRouter = require("./routes/home");
const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");
const commentRouter = require("./routes/comment");

app.use("/", homeRouter);
app.use("/", blogRouter);
app.use("/", userRouter);
app.use("/", commentRouter);


var server = app.listen(port, function () {
    console.log("Listening on port %d", server.address().port);
});
