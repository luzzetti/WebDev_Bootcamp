var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds");

mongoose.connect("mongodb://localhost:3001/yelp_camp_v3", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

seedDB();


app.get("/", (req, res) => {
    res.render("landing");
});

//INDEX - Route
app.get("/campgrounds", (req, res) => {

    //Get all campgrounds from DB
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log("Impossible to retrieve");
            console.log(err);
        } else {
            res.render("index", { campgrounds: campgrounds });
        }
    });
});

//CREATE Route
app.post("/campgrounds", (req, res) => {
    // Get data from form to add to campground array
    console.log("POST HIT: /campgrounds")
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;

    //Redirect back to campgrounds page
    var newCampground = { name: name, image: image, description: desc };
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
app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

//SHOW more info about a campground
app.get("/campgrounds/:id", (req, res) => {

    console.log("PARAMS: " + req.params.id);

    Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
        if (err) {
            console.log("ERRORE: " + err);
        } else {
            console.log("TROVATO");
            res.render("show", { campground: campground });
        }
    });
});

app.get("*", (req, res) => {
    res.send("DO NOT 404 ON ME BRO!");
});

app.listen(3000, () => {
    console.log("YelpCamp Demo avviato sulla porta 3000");
});