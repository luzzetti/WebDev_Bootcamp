
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
                req.flash("error","Something went wrong...");
                    console.log(err);
                } else {
                    theComment.author.id = req.user._id;
                    theComment.author.username = req.user.username;
                    theComment.save();

                    foundCampground.comments.push(theComment);
                    foundCampground.save();

                    // req.flash("success","Succesfully added comment");
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
            req.flash("error","You don't have permission to do that!");
            res.redirect("/campgrounds");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    })
});

//UPDATE - Route
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, theUpdatedComment) => {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("info","Comment updated");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//DESTROY - Route
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndDelete(req.params.comment_id, (err) => {
        if (err) {
            req.flash("error","UNDESTROYABLE");
            res.redirect("back");
        } else {
            req.flash("info","Comment deleted. This alert should be red tho...");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;