var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user")
    ;

mongoose.connect("mongodb://localhost:3001/authDemoApp", { useNewUrlParser: true });

var app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("express-session")({
    secret: "easy peasy lemon squeezy",
    resave: false,
    saveUninitialized: false
}));

passport.use(new LocalStrategy(User.authenticate()));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//  ==================
//      ROUTES
//  ==================

app.get("/", (req, res) => {
    console.log("GET: /");
    res.render("home");
});

app.get("/secret", isLoggedIn, (req, res) => {
    console.log("GET: /register");
    res.render("secret");
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};

//  ==================
//  AUTH Routes
//  ==================

//  Show Sign-up form
app.get("/register", (req, res) => {
    console.log("GET: /register");
    res.render("register");
});

app.post("/register", (req, res) => {
    console.log("POST: /register - " + "usr: " + req.body.username + " - Pwd: " + req.body.password);

    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            console.log("ERRORE: Esiste gia un utente con questo nome" + err);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secret");
            });
        }
    });
});

//  Show Login Form
app.get("/login", (req, res) => {
    console.log("GET: /login");
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) => {
    console.log("Login - Usr: " + req.body.username + " - Pwd: " + req.body.password);
});

//  LogOut
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});










app.listen(3000, () => {
    console.log("AuthDemo started on port 3000");
})