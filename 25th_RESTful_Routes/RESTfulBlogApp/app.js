var express     = require("express"),
    app         = express(),
    methodOverride = require("method-override");
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

//APP CONFIG
mongoose.connect("mongodb://localhost:3001/restful_blog_app", {useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));


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

//NEW route
app.get("/blogs/new", (req, res) => {
    res.render("new");
});

//CREATE route
app.post("/blogs", (req, res) => {
    //Create post
    Blog.create(req.body.blog, (err, newPost) => {
        if (err) {
            console.log("ERRORE: " + err);
        } else {
            res.redirect("/blogs");
        }
    });
    //redirect to the index
});

//SHOW
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            console.log("ERROR: " + err);
            res.redirect("/blogs");
        } else {
            res.render("show", {blog:foundBlog});
        }
    })
});

//EDIT
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, foundPost) => {
        if (err) {
            console.log("ERRORE: " + err);
            res.redirect("/blog");
        } else {
            res.render("edit", {post: foundPost});
        }
    });
});

//UPDATE
app.put("/blogs/:id", (req, res) => {
    Blog.findOneAndUpdate(req.params.id, req.body.blog, (err, updatedPost) => {
        if (err) {
            res.redirect("/");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DELETE Router
app.delete("/blogs/:id", (req, res) => {
    Blog.findOneAndDelete(req.params.id, (err) => {
        if (err) {
            res.redirect("/");
        } else {
            console.log("DELETED!");
            res.redirect("/blogs");
        }
    });
});


app.listen(3000, () => {
    console.log("RESTful blog app avviato sulla porta: 3000");
});