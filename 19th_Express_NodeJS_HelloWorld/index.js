var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hi there, welcome to my assignment!');
});

app.get("/speak/:animal", function(req, res) {
    
    var sounds = {
        pig: "Oink",
        cow: "Mooo",
        dog: "Woof",
        cat: "I hate you, human",
        goldfish: "..."
    };

    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("The " + animal + " says " + sound);

});

app.get("/repeat/:word/:count", function(req, res) {
    var message = "";
    for (var i=0; i< Number(req.params.count); i++) {
        message += req.params.word + " ";
    }
    res.send(message);
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found...what are you doing with your life?");
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});