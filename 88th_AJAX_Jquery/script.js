console.log("Connected");

$("#testBtn").click(function() {
    $.getJSON("http://random.cat/meow")
    .done(function(res) {
        console.log(res);
    })
    .fail(function(res) {
        console.log("OH NOES");
    });
});

function addP(res) {

}


// $("#test").click(function() {
//     $.ajax({
//         method: "GET",
//         url: "https://baconipsum.com/api/?type=meat-and-filler",
//         dataType: 'json'
//     })
//     .done(function(res) {
//         // console.log(res);
//         addP(res);
//     })
//     .fail(function() {
//         console.log("OH NOES!");
//     });
// });

// $("#testGet").click(function() {
//     $.get("https://randomuser.me/api/")
//     .done(function(data) {
//         console.log(data);
//         addP(data);
//     })
//     .fail(function(data) {
//         console.log("OH NOES");
//     })
// })

// $("#testPost").click(function() {
    
//     var data = {name: "Charlie", city: "Florence"};

//     $.post("https://randomuser.me/api/", data)
//     .done(function(data) {
//         addP(data);
//     })
//     .fail(function(data) {
//         console.log("OH NOES");
//     })
// })

// $("#testJson").click(function() {
//     $.getJSON("https://randomuser.me/api/")
//     .done(function(data) {
//         console.log(data);
//         addP(data);
//     })
//     .fail(function(data) {
//         console.log("OH NOES");
//     });
// });


// function addP(res) {
//     $("#lorem").text(result.login);
// }
