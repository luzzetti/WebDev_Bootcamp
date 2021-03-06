
var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground")
var Comment = require("../models/comment");


var middleware = require("../middleware");


//  =====================
//  COMMENTS ROUTES

router.get("/new", middleware.isLoggedIn, (req, res) => {
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
router.post("/", middleware.isLoggedIn, (req, res) => {
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

//EDIT - Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    })
});

//UPDATE - Route
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    console.log(req.params.comment_id);
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, theUpdatedComment) => {
        if (err) {
            consolg.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//DESTROY - Route
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndDelete(req.params.comment_id, (err) => {
        if (err) {
            console.log("Impossibile eliminare il commento");
            res.redirect("back");
        } else {
            console.log("Commento eliminato");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;