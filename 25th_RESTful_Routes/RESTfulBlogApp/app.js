var express     = require("express"),
    app         = express(),
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

//APP CONFIG
mongoose.connect("mongodb://localhost:3001/restful_blog_app", {useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method")); //After BodyParser
app.use(expressSanitizer());


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
    console.log("HIT: /");
    res.redirect("/blogs");
})

app.get("/blogs", (req, res) => {
    console.log("HIT: /blogs");
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
    console.log("HIT: /blogs/new get");
    res.render("new");
});

//CREATE route
app.post("/blogs", (req, res) => {
    console.log("HIT: /blogs in post");
    //Sanitize and Create post
    req.body.blog.body = req.sanitize(req.body.blog.body);

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
    console.log("HIT: /blogs id SHOW");
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
    console.log("HIT: /blogs/id/edit");

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
    
    console.log("HIT: /blogs/id put update");

    req.body.blog.body = req.sanitize(req.body.blog.body);

    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedPost) => {
        if (err) {
            console.log("ERRORE...");
            res.redirect("/");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DELETE Router
app.delete("/blogs/:id", (req, res) => {

    console.log("HIT: /blogs/id delete");

    Blog.findByIdAndDelete(req.params.id, (err) => {
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