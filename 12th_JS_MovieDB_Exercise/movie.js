
var movies = [
    {
        title: "Il Gladiatore",
        rating: 4.5,
        viewed: true
    },
    {
        title: "Matrix",
        rating: 4,
        viewed: true
    },
    {
        title: "Expendables",
        rating: 2,
        viewed: false
    },
    {
        title: "Avengers",
        rating: 3.8,
        viewed: false
    },
    {
        title: "ghost",
        rating: 2.7,
        viewed: true
    }
]

console.log("Start App");

movies.forEach(function(element) {
    
    console.log(buildString(element));

});

function buildString(movie) {
    var message = "You have"
    if (movie.viewed) {
        message += " ";
    } else {
        message += " not ";
    }
    
    message += "viewed \"" + movie.title + "\" - " + movie.rating + " stars";

    return message;
}