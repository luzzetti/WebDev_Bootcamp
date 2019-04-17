console.log("Script.js correctly loaded ...");

var XHR = new XMLHttpRequest();

XHR.onreadystatechange = function() {
    //console.log("Ready State Is: " + XHR.readyState);
    if(XHR.readyState == 4) {
        if(XHR.status == 200) {
            console.log(XHR.responseText);
        } else {
            console.log("Rome, we have a problem");
        }
    }
}

XHR.open("GET", "https://api.github.com/zen");

XHR.send();