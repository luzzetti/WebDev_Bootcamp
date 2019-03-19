var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function(req, res) {
    res.render("home");
})

app.get("/fallfor/:thing", function(req, res) {
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
})

app.get("/posts", function(req, res) {
    var posts = [
        {title: "post-1", author: "susie"},
        {title: "post-2", author: "christian"},
        {title: "Post-3", author: "cris"}
    ];

    res.render("thePostPage", {posts: posts});

})

app.listen(3000, function () {
    console.log('Server started on port 3000 ... ');
  });