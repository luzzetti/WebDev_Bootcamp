var bodyParser = require("body-parser");
var express = require("express");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


const rp = require('request-promise');



// request({
//     'url': 'https://jsonplaceholder.typicode.com/users/1',
//     'method': "GET",
//     'proxy': 'http://proxyvipfra.nb.ford.com:83'
// }, (error, response, body) => {

//     if (!error && response.statusCode == 200) {
        
//         var parsedData = JSON.parse(body);
//         console.log(parsedData.address.city);
//         console.log(parsedData.name);

//     } else {
//         console.log(error);
//     }
// });

rp({
    'url': 'https://jsonplaceholder.typicode.com/users/1',
    'method': "GET",
    'proxy': 'http://proxyvipfra.nb.ford.com:83'
})
.then( (body) => {
    var parsedData = JSON.parse(body);
    console.log(parsedData.name);
    console.log(parsedData.address.city);
})
.catch( function(err) {
    console.log("Error: ", err);
});




