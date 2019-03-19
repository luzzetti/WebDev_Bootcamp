var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var friends = ["tony", "amanda", "federica", "matteo"];

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/friends", function(req, res) {
    res.render("friends", {friends: friends});
});

app.post("/addFriend", function(req, res) {
    var newFriend = req.body.friendName;
    friends.push(newFriend);
    res.redirect("friends");
});


app.listen(3000, function() {
    console.log("Server has started on port 3000 ... ");
});

