

fetch('https://static.usabilla.com/recruitment/apidemo.json', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
}).then((response) => {
    return response.json();
}).then(function(myJson) {
    console.log(myJson);
});
