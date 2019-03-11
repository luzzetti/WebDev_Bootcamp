
var toDo = [];
var risposta = "";
risposta = prompt("Cosa vuoi fare?");

while (risposta !== "quit") {

    if (risposta === "new") {
        toDo.push(prompt("Aggiungi al todo:"));

    } else if (risposta === "list") {
        console.log(toDo);

    } else {
        console.log("Comando sconosciuto");

    }

    risposta = prompt("Cosa vuoi fare?");

}

console.log("Ok. Esci pure...");
