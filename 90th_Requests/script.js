console.log("Connected");

var url = "https://api.github.com/users/luzzetti";

fetch(url)
.then(handleErrors)
.then((req) => {
    console.log("All fine");
})
.catch((error) => {
    console.log(error);
});


function handleErrors (req) {
    if(!req.ok) {
        throw Error(req.status);
    }
    return req;
}