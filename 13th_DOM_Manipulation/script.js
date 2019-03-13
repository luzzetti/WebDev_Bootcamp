console.log("Starting up ...");

/*
setInterval(function() {
    if (isWhite) {
        body.style.background = "black";
        body.style.color = "white";
    } else {
        body.style.background = "white";
        body.style.color = "black";
    }
    isWhite = !isWhite;
}, 5000);
*/



function worstFunctionEverWrittenForBrowsersLikeEver() {
    alert("Funzione disabilitata");
}

var h1 = document.getElementsByTagName("h1")[0];

h1.addEventListener("click", function() {
    h1.classList.toggle("boy")
})

function boyGirl() {
    this.classList.toggle("boy");
}

var lis = document.getElementsByTagName("li");
for (var i=0; i<lis.length; i++) {
	lis[i].addEventListener("click", boyGirl);
}




console.log("Shutting down ...");