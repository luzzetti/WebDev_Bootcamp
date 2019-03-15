console.log("Starting up ... ");

/* Text - Attr - css - html - val  */

$("li:first-of-type").text("Io");

$("input").attr("placeholder","Username");

$("input").attr({
    placeholder: "Username",
    name: "Username",
    type: "text"
});

$("input").val();

$("input").val("Qualcosa");

/* addClass() - removeClass() - toggle()    */

$("li").addClass("sing");

$("li").removeClass("sing");

/* click() - keypress() - on()  */

$("h1").click( function() {
	console.log("Logging your fuckin action to the motherfuckin sysadmin!");
});

$("button").click( function() {
    $(this).css("backgroundColor", "white");
})

$("li:nth-of-type(3)").css("color", "tomato");

$("body").keypress( function(event) {
    if (event.which === 13) {
        alert("LOLLOBAROLLO");
    }
});

$("h1").on("click", function() {
    console.log("Bro clicked on h1");
    $(this).css("color", "purple");
});

$("input").on("mouseenter", function() {
    console.log("WOOOUT");
})

$("button").on("mouseenter", function() {
    $(this).css("font-weight","700");
})

$("button").on("mouseleave", function() {
    $(this).css("font-weight","normal");
})

/*
$("button").on("click", function() {
    $("h1").fadeToggle(1000);
})

*/

$("button").on("click", function() {
    $("h1").slideToggle(1000, function() {
        alert("Così impari a cliccare dove ti pare.");
    });
})


$("h1").on("click", function() {
    $("body * *").text("NOOOOOOOOO");
    console.log("NO! NO! NO!")
    console.log("YOU KILLED HIM!")
    console.log("WHY DID YOU DO THAT!!")
    console.log("U FUCKIN' MONSTER!")
    $("body").fadeOut(3500, function() {
        alert("Puff");
    });
});








