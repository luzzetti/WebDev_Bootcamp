var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");

mongoose.connect("mongodb://localhost:3001/yelp_camp_v3", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
console.log("DirName: " + __dirname);

seedDB();


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

//Passare req.user ovunque
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.get("/", (req, res) => {
    res.render("landing");
});

//  ==============
//  AUTH ROUTES
//  ==============

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, theUser) => {
        if (err) {
            console.log(err);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, () => {
                console.log("Added: " + theUser);
                res.redirect("/campgrounds");
            });
        }
    });
});

app.get("/login", (req, res) => {
    res.render("login");
});

//Handling Login Logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {
    console.log("Login - Usr: " + req.body.username + " - Pwd: " + req.body.password);
});

//  LogOut
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
});

//INDEX - Route
app.get("/campgrounds", (req, res) => {

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
    res.render("campgrounds/new");
});

//SHOW more info about a campground
app.get("/campgrounds/:id", (req, res) => {

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

//  =====================
//  COMMENTS ROUTES

app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
    //Find campground by ID
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: foundCampground });
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
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
                    foundCampground.comments.push(theComment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});



app.get("*", (req, res) => {
    res.send("DO NOT 404 ON ME BRO!");
});



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};


app.listen(3000, () => {
    console.log("YelpCamp Demo avviato sulla porta 3000");
});