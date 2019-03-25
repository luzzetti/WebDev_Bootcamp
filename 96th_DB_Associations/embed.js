var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:3001/blog_demo", {useNewUrlParser: true });

//POST - title, content

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

//USER - email, name

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);


User.findOne({name: "vincenzo"}, (err, user) => {
    if (err) {
        console.log("ERROREEEE");
    } else {
        console.log("YEAH: " + user);
        user.posts.push({
            title: "3 things I really hate",
            content: "this. that. everything"
        });
        user.save((err, user) => {
            if (err) {
                console.log("An error has occurred: " + err);
            } else {
                console.log("ROBA: " + user);
            }
        });
    }
});

// var newUser = new User({
//     email: "vincenzo.carmine@gmail.com",
//     name: "vincenzo"
// });

// newUser.posts.push({
//     title: "How to bre polyjuice potion",
//     content: "Just Kidding"
// }); 

// newUser.save((err, user) => {
//     if (err) {
//         console.log("Errore nel salvataggio: " + err);
//     } else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "They are delicious"
// });

// newPost.save((err, aPost) => {
//     if (err) {
//         console.log("ERRORE: " + err);
//     } else {
//         console.log("ADDED: " + aPost);
//     }
// });

