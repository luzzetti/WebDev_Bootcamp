var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

// General search:
// http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb 

const omdbApiURL = "http://www.omdbapi.com/";
var omdbApiPARAMS = "?s=";
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

/*
So the thing to remember here is, if the request is sent via a GET method, then it will populate the req.query object, but if it is sent as a POST method then it will populate the req.body object (as long as body-parser is installed and configured properly in your project).
*/

app.get("/results", (req, res) => {
    console.log("Hit: /results");

    var titolo = req.query.titolo;
    var url = omdbApiURL + omdbApiPARAMS + titolo + omdbApiKEY;
    var connParams = {
        'url': url,
        'method': "GET",
        'proxy': 'http://proxyvipfra.nb.ford.com:83'
    }

    console.log("Cerco: " + connParams.url);

    request(connParams, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);

            res.render("results", { data: data });
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