
var colori = ["rosso", "blue", "verde"];

/* Push/Pop */
colori.push("Nero");
colori.push("indaco");
colori.push("verdognolo");
colori.pop();

console.log(colori);

/*  Shift/Unshift */
colori.unshift("Bianco");
colori.shift();

console.log(colori);

/* IndexOf */
colori.indexOf("verde");     //  2
colori.indexOf("Pervinca"); //  -1

/*  Slice   (Compreso, Escluso) */
var menoColori = colori.slice(1,3);
console.log(menoColori);
var coloriClonato = colori.slice();
console.log(coloriClonato);

/* Matrix */
var friendGroup= [
    ["Marina", "Giulia", "Francesca"],
    ["Marco", "Mario", "Antonio"],
    ["Franco", "Bruno", "Matteo"]
]

console.log(friendGroup[0]);