/* eslint-disable no-undef */
/* eslint-disable no-console */
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    flash = require("connect-flash");


var methodOverride = require("method-override");

// var Campground = require("./models/campground"),
//     Comment = require("./models/comment"),
var User = require("./models/user"),
    seedDB = require("./seeds");

var commentRoutes = require("./routes/comments"),
    campgroundsRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost:3001/yelp_camp_v3", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//Se cambio sta linea, non trovo più i CSS. Attenzione
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// console.log("DirName: " + __dirname);

seedDB();

//BEFORE passport configuration
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Oh she touched my tralala",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//MOLTO IMPORTANTE
//passa currentUser e message in ogni pagina del template. views
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.warning = req.flash("warning");
    res.locals.info = req.flash("info");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundsRoutes);


app.get("*", (req, res) => {
    res.send("DO NOT 404 ON ME BRO!");
});

app.listen(3000, () => {
    console.log("YelpCamp Demo avviato sulla porta 3000");
});