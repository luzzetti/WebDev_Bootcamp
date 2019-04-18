console.log("Connected");

var url = "https://randomuser.me/api/";

var button = document.querySelector("#btn");
var fullNameDisplay = document.querySelector("#fullname");
var avatar = document.querySelector("#avatar");
var email = document.querySelector("#email");
var username = document.querySelector("#username");
var city = document.querySelector("#city");



var XHR = new XMLHttpRequest();

button.addEventListener("click", function() {

    fetch(url)
    .then(handleError)
    .then(parseJSON)
    .then(updateProfile)
    .catch(printError);

});

function handleError(req) {
    if (!req.ok) {
        throw Error("CUSTOM: " + req.status);
    }
    console.log("parsing...");
    return req;
}

function parseJSON(res) {
    return res.json().then(function(data) {
        return data.results[0];
    });
};

function updateProfile(parsedData) {
    
    var fullname = parsedData.name.title 
    fullname += " " + parsedData.name.first;
    fullname += " " + parsedData.name.last;
    fullNameDisplay.innerText = fullname;

    avatar.src = parsedData.picture.medium;

    email.innerText = parsedData.email;

    username.innerText = parsedData.login.username;

    city.innerText = parsedData.location.city;
}

function printError(error) {
    console.log(error);
}