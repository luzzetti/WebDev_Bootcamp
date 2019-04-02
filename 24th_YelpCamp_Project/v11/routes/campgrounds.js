var express = require("express");
var Campground = require("../models/campground");
var methodOverride = require("method-override");
var router = express.Router();

var middleware = require("../middleware");


//INDEX - Route
router.get("/", (req, res) => {

    //Get all campgrounds from DB
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log("Impossible to retrieve");
            console.log(err);
        } else {
            res.render("campgrounds/index", { 
                campgrounds: campgrounds,
             });
        }
    });
});

//CREATE Route
router.post("/", middleware.isLoggedIn, (req, res) => {
    // Get data from form to add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    //Redirect back to campgrounds page
    var newCampground = { name: name, image: image, description: desc, author: author};
    // Create a new campground and save to DB

    Campground.create(newCampground, function (err, campground) {
        if (err) {
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//NEW route
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

//SHOW more info about a campground
router.get("/:id", (req, res) => {

    Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
        if (err) {
        } else {
            res.render("campgrounds/show", { campground: campground });
        }
    });
});

//EDIT - routes
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
        Campground.findById(req.params.id, (err, foundCampground) => {
            res.render("campgrounds/edit", {campground: foundCampground});
        });
});

//UPDATE - Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err) {
            req.flash("error","Impossibile aggiornare. Errore generico");
            res.redirect("/campground");
        } else {
            req.flash("success","Campground Added Succesfully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY - Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log("Impossibile eliminare");
            req.flash("error","UNDESTROYABLE!");
        } else {
            req.flash("success","Deleted Successfully");
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;