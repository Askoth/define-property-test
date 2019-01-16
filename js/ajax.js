
export default {
    fetchJson({page=1, url}) {
        return new Promise((resolve, reject) => {
            fetch(`${url}?page=${page}`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
            }).then((response) => {
                return response.json();
            }).then(function(myJson) {
                resolve(myJson);
            }).catch((err) => {
                reject(err);
            });
        })
    }
}
