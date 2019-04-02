/* eslint-disable no-console */
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");



router.get("/", (req, res) => {
    res.render("landing");
});

//  ==============
//  AUTH ROUTES
//  ==============

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, theUser) => {
        if (err) {
            console.log(err.message);
            req.flash("error", err.message);
            return res.redirect("register");
        } else {
            passport.authenticate("local")(req, res, () => {
                req.flash("success","Welcome to yelpcamp " + theUser.username + "!");
                res.redirect("/campgrounds");
            });
        }
    });
});

router.get("/login", (req, res) => {
    res.render("login");
});

//Handling Login Logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {
    console.log("Login - Usr: " + req.body.username + " - Pwd: " + req.body.password);
});

//  LogOut
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});


module.exports = router;