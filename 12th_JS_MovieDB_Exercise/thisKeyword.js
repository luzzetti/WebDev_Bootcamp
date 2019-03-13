

var comments = {};
comments.data = ["Good Job", "Bravo", "Meh"];
comments.print = function () {
    this.data.forEach(function (el) {
        console.log(el);
    }
)};