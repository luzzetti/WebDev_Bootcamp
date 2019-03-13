console.log("Connected ... ");

var p1Button = document.getElementById("p1");
var p2Button = document.getElementById("p2");
var rstButton = document.getElementById("reset");
var h1 = document.getElementsByTagName("h1")[0];
var h1p1Score = document.getElementById("h1p1Score");
var h1p2Score = document.getElementById("h1p2Score");
var inputScore = document.querySelector("#winningScoreInput");
var displayScore = document.querySelector("#winningScoreDisplay")

var p1Score = 0;
var p2Score = 0;

var gameOver = false;
var winningScore = 5;
console.log(winningScore);

function checkWinningScore() {
    if (p1Score === winningScore) {
        h1p1Score.classList.add("green");
        gameOver = true;
    } else if (p2Score === winningScore) {
        h1p2Score.classList.add("green");
        gameOver = true;
    }
}

p1Button.addEventListener("click", function() {

    if (gameOver) {
        return;
    }

   p1Score++;
   h1p1Score.textContent = p1Score;
   checkWinningScore();
});

p2Button.addEventListener("click", function() {

    if (gameOver) {
        return;
    }

    p2Score++;
    h1p2Score.textContent = p2Score;

    checkWinningScore();

});

rstButton.addEventListener("click", function() {
    reset();
});

inputScore.addEventListener("change", function() {
    displayScore.textContent = this.value;
    winningScore = Number(this.value);
    reset();
    console.log("Clicked Input");
});
 
 
function reset() {

    h1p1Score.textContent = 0;
    h1p2Score.textContent = 0;

    p1Score = p2Score = 0;

    gameOver = false;

    h1p1Score.classList.remove("green");
    h1p2Score.classList.remove("green");

    console.log("Reset Btn Pressd");

}

