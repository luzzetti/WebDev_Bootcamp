var express = require("express");
var Campground = require("../models/campground");
var router = express.Router();


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
router.post("/", isLoggedIn, (req, res) => {
    // Get data from form to add to campground array
    console.log("POST HIT: /campgrounds")
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
            console.log("Errore nell'aggiunta di un campground");
            console.log(err);
        } else {
            console.log("Campground aggiunto. GETting to campgrounds");
            res.redirect("/campgrounds");
        }
    });
});

//NEW route
router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

//SHOW more info about a campground
router.get("/:id", (req, res) => {

    console.log("PARAMS: " + req.params.id);

    Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
        if (err) {
            console.log("ERRORE: " + err);
        } else {
            console.log("TROVATO");
            res.render("campgrounds/show", { campground: campground });
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