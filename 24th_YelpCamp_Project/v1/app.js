var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

//Refactor This
var campgrounds = [
    {name: "Castello del Boccale", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t31.0-8/18672840_850962105060614_68846299082118422_o.jpg?_nc_cat=107&_nc_ht=scontent-mxp1-1.xx&oh=2e4d337726bfc90dc62aa6a876d05bc2&oe=5D13758D"},
    {name: "Antignanos Pier", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t31.0-8/18620821_850962091727282_6459667969808174257_o.jpg?_nc_cat=107&_nc_ht=scontent-mxp1-1.xx&oh=6428e682038a21dd2813fc962065d87b&oe=5D4B55EE"},
    {name: "Viterbo", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/50292177_1302846096538877_5467230833637064704_o.jpg?_nc_cat=109&_nc_ht=scontent-mxp1-1.xx&oh=0b5d927d7409dcb186fa8912f284329a&oe=5D4D81AA"},
    {name: "Siena", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/47382745_1270530729770414_5396446761826910208_o.jpg?_nc_cat=111&_nc_ht=scontent-mxp1-1.xx&oh=2f74d45dfc62e7d5d43b707900fbc249&oe=5D1484F4"},
    {name: "Castello del Boccale", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t31.0-8/18672840_850962105060614_68846299082118422_o.jpg?_nc_cat=107&_nc_ht=scontent-mxp1-1.xx&oh=2e4d337726bfc90dc62aa6a876d05bc2&oe=5D13758D"},
    {name: "Antignanos Pier", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t31.0-8/18620821_850962091727282_6459667969808174257_o.jpg?_nc_cat=107&_nc_ht=scontent-mxp1-1.xx&oh=6428e682038a21dd2813fc962065d87b&oe=5D4B55EE"},
    {name: "Viterbo", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/50292177_1302846096538877_5467230833637064704_o.jpg?_nc_cat=109&_nc_ht=scontent-mxp1-1.xx&oh=0b5d927d7409dcb186fa8912f284329a&oe=5D4D81AA"},
    {name: "Siena", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/47382745_1270530729770414_5396446761826910208_o.jpg?_nc_cat=111&_nc_ht=scontent-mxp1-1.xx&oh=2f74d45dfc62e7d5d43b707900fbc249&oe=5D1484F4"}
]

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {

    res.render("campgrounds", {campgrounds:campgrounds});

});

app.post("/campgrounds", (req, res) => {
    // Get data from form to add to campground array
    console.log("POST HIT: /campgrounds")
    var name = req.body.name;
    var image = req.body.image;
    //Redirect back to campgrounds page
var newCampground = {name:name, image:image};

    campgrounds.push(newCampground);
    //Redirect default: GET
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.get("*", (req, res) => {
    app.send("DO NOT 404 ON ME BRO!");
});

app.listen(3000, () => {
    console.log("YelpCamp Demo avviato sulla porta 3000");
});