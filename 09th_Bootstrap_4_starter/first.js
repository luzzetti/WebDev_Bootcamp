
function factorial(num) {

    if (num == 1) {
        return 1;
    }

    return num*factorial(num-1);
} 

function snakeToKebab(stringa) {
    return stringa.replace(/\_/g, "-");
}

function sing() {
    console.log("Twinkle twinkle...");
    console.log("I wonder...");
}

//Funzione anonima
/*
setInterval(function(){
    console.log("OhMyGOD!");
    console.log("THIS IS SCARY!"); }, 2000);
*/