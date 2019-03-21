var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

/* DB SETUP */
mongoose.connect("mongodb://localhost:3001/yelp_camp", { useNewUrlParser: true });
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Castello del Boccale",
//     image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t31.0-8/18672840_850962105060614_68846299082118422_o.jpg?_nc_cat=107&_nc_ht=scontent-mxp1-1.xx&oh=2e4d337726bfc90dc62aa6a876d05bc2&oe=5D13758D"
// }, function (err, campground) {
//     if (err) {
//         console.log("ERROR");
//         console.log(err);
//     } else {
//         console.log("NEWLY CREATED CAMPGROUND");
//         console.log(campground);
//     }
// });




app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

//Refactor This
var campgrounds = [
    { name: "Antignanos Pier", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t31.0-8/18620821_850962091727282_6459667969808174257_o.jpg?_nc_cat=107&_nc_ht=scontent-mxp1-1.xx&oh=6428e682038a21dd2813fc962065d87b&oe=5D4B55EE" },
    { name: "Viterbo", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/50292177_1302846096538877_5467230833637064704_o.jpg?_nc_cat=109&_nc_ht=scontent-mxp1-1.xx&oh=0b5d927d7409dcb186fa8912f284329a&oe=5D4D81AA" },
    { name: "Siena", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/47382745_1270530729770414_5396446761826910208_o.jpg?_nc_cat=111&_nc_ht=scontent-mxp1-1.xx&oh=2f74d45dfc62e7d5d43b707900fbc249&oe=5D1484F4" },
    { name: "Castello del Boccale", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t31.0-8/18672840_850962105060614_68846299082118422_o.jpg?_nc_cat=107&_nc_ht=scontent-mxp1-1.xx&oh=2e4d337726bfc90dc62aa6a876d05bc2&oe=5D13758D" },
    { name: "Antignanos Pier", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t31.0-8/18620821_850962091727282_6459667969808174257_o.jpg?_nc_cat=107&_nc_ht=scontent-mxp1-1.xx&oh=6428e682038a21dd2813fc962065d87b&oe=5D4B55EE" }
]

app.get("/", (req, res) => {

    res.render("landing");
});

app.get("/campgrounds", (req, res) => {

    //Get all campgrounds from DB
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log("Impossible to retrieve");
            console.log(err);
        } else {
            res.render("campgrounds", { campgrounds: campgrounds });
        }
    });
});


app.post("/campgrounds", (req, res) => {
    // Get data from form to add to campground array
    console.log("POST HIT: /campgrounds")
    var name = req.body.name;
    var image = req.body.image;
    //Redirect back to campgrounds page
    var newCampground = { name: name, image: image };
    // Create a new campground and save to DB

    Campground.create(newCampground, function(err, campground) {
        if (err) {
            console.log("Errore nell'aggiunta di un campground");
            console.log(err);
        } else {
            console.log("Campground aggiunto. GETting to campgrounds");
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.get("*", (req, res) => {
    res.send("DO NOT 404 ON ME BRO!");
});

app.listen(3000, () => {
    console.log("YelpCamp Demo avviato sulla porta 3000");
});