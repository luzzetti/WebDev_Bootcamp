console.log("Starting ... ");

var colorButton = document.getElementById("colorToggler");

colorButton.addEventListener("click", function() {
    this.style.background = pickRandomColor();
    this.style.width = pickRandomMeasure();
    this.style.height = pickRandomMeasure();
});


function pickRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function pickRandomMeasure() {
        var value = Math.floor(Math.random()*200);
        console.log("Casuale: " + value);
        return value + "px";
}