console.log("Connected");

var XHR = new XMLHttpRequest();
var updated = document.querySelector("#dataAggiornamento");
var valore = document.querySelector("#prezzo");
var btnAggiorna = document.querySelector("#aggiorna");
var testUpdate = 0;

XHR.onreadystatechange = function() {
    if (XHR.readyState == 4 && XHR.status == 200) {
        updatePage();
    }
};

var timerID = setInterval(function() {
    
    XHR.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json");

    XHR.send();

    testUpdate++;
    console.log(testUpdate);

}, 60000);


// btnAggiorna.addEventListener("click", function() {

//     XHR.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json");

//     XHR.send();

// });

function updatePage() {
    var data = JSON.parse(XHR.responseText);
    valore.textContent = data.bpi.EUR.rate;
    dataAggiornamento.textContent = data.time.updated;
}