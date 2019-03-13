console.log("ToDo: Connecting ... ");

var todoLis = document.querySelectorAll("#todoList li");

for (var i=0; i<todoLis.length; i++) {

    todoLis[i].addEventListener("mouseover", function() {
        this.classList.add("selected");
    });
    
    todoLis[i].addEventListener("mouseout", function() {
        this.classList.remove("selected");
    });

    todoLis[i].addEventListener("click", function() {
        this.classList.toggle("done");
    });

}

