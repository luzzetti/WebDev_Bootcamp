var numOfSquares = 6;
var colors = [];
var pickedColor;

var squares = document.getElementsByClassName("square");
var rgbDisplay = document.getElementById("rgbDisplay");
var endGameMessage = document.getElementById("endGameMessage");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");

var modeButtons = document.querySelectorAll(".mode");

init();

rgbDisplay.textContent = pickedColor;

updateSquareColors();

resetButton.addEventListener("click", function () {

    reset();

})

function init() {
    //Mode Button Event Listener
    setupModeButtons();

    //Squares Listener
    setupSquares();

    reset();

}



function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {

        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");

            this.classList.add("selected");

            this.textContent === "Easy" ? numOfSquares = 3 : numOfSquares = 6;

            reset();

        });
    }
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {

            if (this.style.backgroundColor === pickedColor) {

                endGameMessage.textContent = "Correct!";

                changeColors(pickedColor);
                h1.style.backgroundColor = pickedColor;
                resetButton.textContent = "Play Again?";

            } else {

                this.style.backgroundColor = "#232323";
                endGameMessage.textContent = "Try again!";
            }

        });
    }

}

function reset() {

    colors = generateRandomColors(numOfSquares);

    updateSquareColors();

    pickedColor = pickColor();

    rgbDisplay.textContent = pickedColor;

    resetButton.textContent = "New Colors";

    h1.style.backgroundColor = "steelblue";

}

function pickColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function generateRandomColors(num) {
    var colors = [];
    for (var i = 0; i < num; i++) {
        colors.push(getRandomColor());
    }
    return colors;
}


function getRandomColor() {
    var message = "rgb(";
    message += Math.floor(Math.random() * 255 + 1);
    message += ", ";
    message += Math.floor(Math.random() * 255 + 1);
    message += ", ";
    message += Math.floor(Math.random() * 255 + 1);
    message += ")";
    console.log(message);
    return message;
}

function updateSquareColors() {
    for (var i = 0; i < squares.length; i++) {

        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    console.log("Colori: " + colors);

}
