var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
    { description: "Bacon ipsum dolor amet shoulder ham hock pork chop pork rump, shank salami pastrami. Salami cupim tenderloin pastrami beef ribs rump corned beef filet mignon ham landjaeger. Tail pork belly chicken hamburger ham hock. Ham pork rump, ground round picanha sirloin sausage cupim kielbasa strip steak. Tongue ham hock pork swine, spare ribs pancetta flank t-bone. Salami picanha short loin shoulder, kielbasa bresaola meatball andouille capicola meatloaf flank tenderloin pastrami chicken. Pork tenderloin short ribs landjaeger pork chop.Leberkas cupim sirloin shankle frankfurter, ribeye ham hock tenderloin jowl.Ribeye shank pork, pork loin chuck rump short ribs tri- tip kevin jowl shoulder andouille pig jerky.Picanha brisket cupim turducken ball tip rump.Rump ball tip frankfurter, kielbasa short ribs chuck bresaola jowl kevin meatloaf ham hock salami chicken cow venison.Turducken sirloin ground round ham hock t - bone venison. Pork kielbasa doner kevin bresaola, tail meatloaf chuck short loin turducken sirloin swine beef ribs.Ribeye pig cupim swine alcatra corned beef.Burgdoggen andouille prosciutto filet mignon venison.Chuck turkey corned beef beef ribs, meatloaf porchetta frankfurter landjaeger shankle chicken pancetta capicola t - bone.", name: "Antignanos Pier", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t31.0-8/18620821_850962091727282_6459667969808174257_o.jpg?_nc_cat=107&_nc_ht=scontent-mxp1-1.xx&oh=6428e682038a21dd2813fc962065d87b&oe=5D4B55EE"},
    { description: "Bacon ipsum dolor amet shoulder ham hock pork chop pork rump, shank salami pastrami. Salami cupim tenderloin pastrami beef ribs rump corned beef filet mignon ham landjaeger. Tail pork belly chicken hamburger ham hock. Ham pork rump, ground round picanha sirloin sausage cupim kielbasa strip steak. Tongue ham hock pork swine, spare ribs pancetta flank t-bone. Salami picanha short loin shoulder, kielbasa bresaola meatball andouille capicola meatloaf flank tenderloin pastrami chicken. Pork tenderloin short ribs landjaeger pork chop.Leberkas cupim sirloin shankle frankfurter, ribeye ham hock tenderloin jowl.Ribeye shank pork, pork loin chuck rump short ribs tri- tip kevin jowl shoulder andouille pig jerky.Picanha brisket cupim turducken ball tip rump.Rump ball tip frankfurter, kielbasa short ribs chuck bresaola jowl kevin meatloaf ham hock salami chicken cow venison.Turducken sirloin ground round ham hock t - bone venison. Pork kielbasa doner kevin bresaola, tail meatloaf chuck short loin turducken sirloin swine beef ribs.Ribeye pig cupim swine alcatra corned beef.Burgdoggen andouille prosciutto filet mignon venison.Chuck turkey corned beef beef ribs, meatloaf porchetta frankfurter landjaeger shankle chicken pancetta capicola t - bone.", name: "Viterbo", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/50292177_1302846096538877_5467230833637064704_o.jpg?_nc_cat=109&_nc_ht=scontent-mxp1-1.xx&oh=0b5d927d7409dcb186fa8912f284329a&oe=5D4D81AA" },
    { description: "Bacon ipsum dolor amet shoulder ham hock pork chop pork rump, shank salami pastrami. Salami cupim tenderloin pastrami beef ribs rump corned beef filet mignon ham landjaeger. Tail pork belly chicken hamburger ham hock. Ham pork rump, ground round picanha sirloin sausage cupim kielbasa strip steak. Tongue ham hock pork swine, spare ribs pancetta flank t-bone. Salami picanha short loin shoulder, kielbasa bresaola meatball andouille capicola meatloaf flank tenderloin pastrami chicken. Pork tenderloin short ribs landjaeger pork chop.Leberkas cupim sirloin shankle frankfurter, ribeye ham hock tenderloin jowl.Ribeye shank pork, pork loin chuck rump short ribs tri- tip kevin jowl shoulder andouille pig jerky.Picanha brisket cupim turducken ball tip rump.Rump ball tip frankfurter, kielbasa short ribs chuck bresaola jowl kevin meatloaf ham hock salami chicken cow venison.Turducken sirloin ground round ham hock t - bone venison. Pork kielbasa doner kevin bresaola, tail meatloaf chuck short loin turducken sirloin swine beef ribs.Ribeye pig cupim swine alcatra corned beef.Burgdoggen andouille prosciutto filet mignon venison.Chuck turkey corned beef beef ribs, meatloaf porchetta frankfurter landjaeger shankle chicken pancetta capicola t - bone.", name: "Siena", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/47382745_1270530729770414_5396446761826910208_o.jpg?_nc_cat=111&_nc_ht=scontent-mxp1-1.xx&oh=2f74d45dfc62e7d5d43b707900fbc249&oe=5D1484F4" },
    { description: "Bacon ipsum dolor amet shoulder ham hock pork chop pork rump, shank salami pastrami. Salami cupim tenderloin pastrami beef ribs rump corned beef filet mignon ham landjaeger. Tail pork belly chicken hamburger ham hock. Ham pork rump, ground round picanha sirloin sausage cupim kielbasa strip steak. Tongue ham hock pork swine, spare ribs pancetta flank t-bone. Salami picanha short loin shoulder, kielbasa bresaola meatball andouille capicola meatloaf flank tenderloin pastrami chicken. Pork tenderloin short ribs landjaeger pork chop.Leberkas cupim sirloin shankle frankfurter, ribeye ham hock tenderloin jowl.Ribeye shank pork, pork loin chuck rump short ribs tri- tip kevin jowl shoulder andouille pig jerky.Picanha brisket cupim turducken ball tip rump.Rump ball tip frankfurter, kielbasa short ribs chuck bresaola jowl kevin meatloaf ham hock salami chicken cow venison.Turducken sirloin ground round ham hock t - bone venison. Pork kielbasa doner kevin bresaola, tail meatloaf chuck short loin turducken sirloin swine beef ribs.Ribeye pig cupim swine alcatra corned beef.Burgdoggen andouille prosciutto filet mignon venison.Chuck turkey corned beef beef ribs, meatloaf porchetta frankfurter landjaeger shankle chicken pancetta capicola t - bone.", name: "Castello del Boccale", image: "https://scontent-mxp1-1.xx.fbcdn.net/v/t31.0-8/18672840_850962105060614_68846299082118422_o.jpg?_nc_cat=107&_nc_ht=scontent-mxp1-1.xx&oh=2e4d337726bfc90dc62aa6a876d05bc2&oe=5D13758D" }
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
                        {
                            text: "This place is great",
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