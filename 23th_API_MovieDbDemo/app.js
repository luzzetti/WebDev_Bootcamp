var express = require("express");
var app = express();
var request = require("request");

app.set("view engine","ejs");

// General search:
// http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb 

const omdbApiURL = "http://www.omdbapi.com/";
var omdbApiPARAMS = "?s=";
var movieTitle = "california";
const omdbApiKEY = "&apikey=thewdb";

var connParams = {
    'url': omdbApiURL + omdbApiPARAMS + movieTitle + omdbApiKEY,
    'method': "GET",
    'proxy': 'http://proxyvipfra.nb.ford.com:83'
}

app.get("/", (req, res) => {
    console.log("Hit: /");
    res.render("search");
})

app.get("/results", (req, res) => {
    console.log("Hit: /results");

    var connParams = {
        'url': omdbApiURL + omdbApiPARAMS + req.query.titolo + omdbApiKEY,
        'method': "GET",
        'proxy': 'http://proxyvipfra.nb.ford.com:83'
    }

    console.log("Cerco: " + connParams.url);

    request(connParams, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);

            res.render("results", {data: data});
        }
    });
});


app.get("*", (req, res) => {
    console.log("Hit: 404");
    res.send("4 oh fuckin 4");
})

app.listen(3000, () => {
    console.log("MovieApp avviato sulla porta 3000");
})