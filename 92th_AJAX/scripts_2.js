console.log("Script_2");

//var btn = $("casualizzatore");
var btn = document.querySelector("#casualizzatore");
var immagine = document.querySelector("#foto");


btn.addEventListener("click", function() {

    //Make the request
    var XHR = new XMLHttpRequest();

    XHR.open("GET", "https://dog.ceo/api/breeds/image/random");

    XHR.send();

    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {
            
            var data = JSON.parse(XHR.responseText);
            var URL = data.message;

            immagine.src = URL;

            //immagine.setAttribute("src", "TEST");
        }
    }
    
});
