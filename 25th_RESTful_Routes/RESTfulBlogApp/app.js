var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

//APP CONFIG
mongoose.connect("mongodb://localhost:3001/restful_blog_app", {useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: {type: String, default: "https://via.placeholder.com/1920x1080"},
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//  RESTFUL ROUTES

//INDEX route

app.get("/", (req, res) => {
    res.redirect("/blogs");
})

app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log("ERRORE: " + err);
        } else {
            res.render("index", {blogs:blogs});
        }
    });
});



app.listen(3000, () => {
    console.log("RESTful blog app avviato sulla porta: 3000");
});