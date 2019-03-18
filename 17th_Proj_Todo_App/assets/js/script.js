console.log("Personal Javascript File Loaded Correctly ... ");

//Barra elementi completati
$("ul").on("click", "li", function () {
    $(this).toggleClass("completed");
});

//Click on X to delete ToDo
$("ul").on("click", "span", function (event) {

    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    });

    event.stopPropagation();

});

$("input[type='text']").keypress(function(event) {

    if (event.which === 13) {

        var todoText = $(this).val();
        $("ul").append("<li><span><i class='fas fa-trash'></i></span> " + todoText + "</li>");

        $(this).val("");

    }
});

$(".fa-plus").click(function() {
    $("input[type='text']").fadeToggle(500);
});
