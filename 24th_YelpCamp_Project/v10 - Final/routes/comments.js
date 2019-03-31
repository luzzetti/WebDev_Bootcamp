
var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground")
var Comment = require("../models/comment");

//  =====================
//  COMMENTS ROUTES

router.get("/new", isLoggedIn, (req, res) => {
    //Find campground by ID
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: foundCampground });
        }
    });
});

// Comments Create
router.post("/", isLoggedIn, (req, res) => {
    //Lookup campground by id
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, theComment) => {
                if (err) {
                    console.log(err);
                } else {
                    //Add username and ID to comment
                    console.log("New comment username: " + req.user.username);
                    //Save comment
                    theComment.author.id = req.user._id;
                    theComment.author.username = req.user.username;
                    theComment.save();

                    foundCampground.comments.push(theComment);
                    foundCampground.save();

                    console.log(theComment);
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

module.exports = router;