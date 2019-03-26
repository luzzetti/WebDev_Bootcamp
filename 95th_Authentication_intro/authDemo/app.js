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

app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
    secret: "easy peasy lemon squeezy",
    resave: false,
    saveUninitialized: false
}));

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

app.get("/secret", (req, res) => {
    res.render("secret");
});

//  ==================
//  AUTH Routes
//  ==================

//  Show Sign-up form
app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    
    console.log(res.body.username);
    console.log(res.body.password);

    User.register(new User({username: res.body.username}), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("/register");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secret");
            });
        }
    })
    res.send("REGISTERED!");
});






app.listen(3000, () => {
    console.log("AuthDemo started on port 3000");
})