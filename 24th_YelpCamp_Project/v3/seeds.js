var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
    { description: "blabla", name: "Antignanos Pier", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t31.0-8/18620821_850962091727282_6459667969808174257_o.jpg?_nc_cat=107&_nc_ht=scontent-mxp1-1.xx&oh=6428e682038a21dd2813fc962065d87b&oe=5D4B55EE" },
    { description: "blabla", name: "Viterbo", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/50292177_1302846096538877_5467230833637064704_o.jpg?_nc_cat=109&_nc_ht=scontent-mxp1-1.xx&oh=0b5d927d7409dcb186fa8912f284329a&oe=5D4D81AA" },
    { description: "blabla", name: "Siena", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/47382745_1270530729770414_5396446761826910208_o.jpg?_nc_cat=111&_nc_ht=scontent-mxp1-1.xx&oh=2f74d45dfc62e7d5d43b707900fbc249&oe=5D1484F4" },
    { description: "blabla", name: "Castello del Boccale", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t31.0-8/18672840_850962105060614_68846299082118422_o.jpg?_nc_cat=107&_nc_ht=scontent-mxp1-1.xx&oh=2e4d337726bfc90dc62aa6a876d05bc2&oe=5D13758D" }
]

function seedDB() {
    Campground.remove({}, (err) => {
        if (err) {
            console.log("Error");
        } else {
            console.log("ERHMMM");
        }

        //Add a few campgrounds

        data.forEach((seed) => {
            Campground.create(seed, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added Campground");
                    //Create a comment
                    Comment.create(
                        {text: "This place is great", 
                        author: "Bob"
                    }, (err, comment) => {
                        if (err) {
                            console.log(err);
                        } else {
                            data.comments.push(comment);
                            data.save();
                            console.log("Created new comment");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;