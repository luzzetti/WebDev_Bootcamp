var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:3001/blog_demo_2", {useNewUrlParser: true });


var Post = require("./models/post");
var User = require("./models/user");


Post.create({
    title: "How to cook - part 3",
    content: "Bla bla bla blaaaa"
}, (err, post) => {
    User.findOne({email: "bob@gmail.com"}, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save((err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});

// User.create({
//     email: "bog@gmail.com",
//     name: "Bob Belcher"
// });

