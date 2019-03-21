console.log("App has started");

var mongoose = require("mongoose");

    //Se c'è lo apre, altrimenti lo crea
mongoose.connect("mongodb://localhost:3001/cat_app", {useNewUrlParser: true});

    //Create the cat schema
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

    // Associo lo schema ad un modello, e lo 
    // ficco dentro una variabile
var Cat = mongoose.model("Cat", catSchema);

//  Ora posso usare Cat.create, Cat.remove, ecc....

//Adding a new cat to database

// var george = new Cat({
//     name: "Mrs.Norris",
//     age: 7,
//     temperament: "Evil"
// });

//George indica il gatto in jS. cat invece ritorna il gatto nel database.
//quindi avra anche un ID.

// george.save( function(err, cat) {
//     if(err) {
//         console.log("Something went wrong while saving into database");
//         console.log(cat);
//     } else {
//         console.log("Cat saved");
//         console.log(cat);
//     }
// });

Cat.create({
   name: "Snow White" ,
   age: 15,
   temperament: "Bland"
}, function(err, cat) {
    if (err) {
        console.log("NOPE!");
        console.log(err);
    } else {
        console.log("CAT ADDED!");
    }
});

//Retrieve all cats from database and console.log each one

Cat.find({}, function(err, cats) {
    if (err) {
        console.log("OH NOES");
        consol.log(err);
    } else {
        console.log("Gatti nel database: ");
        console.log(cats);
    }
});