
export default {
    fetchJson({page=1, url}) {
        return new Promise((resolve, reject) => {
            fetch(`${url}?page=${page}`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
            }).then((response) => {
                return response.json();
            }).then(function(myJson) {

                myJson.items = polyfillImages(myJson.items);

                resolve(myJson);
            }).catch((err) => {
                reject(err);
            });
        })
    }
}

function randomizeKitten ({width, height}) {
    const rand =  Math.random() * 100 % 2 | 0;

    return rand ? `//placekitten.com/${width}/${height}` : `//placekitten.com/g/${width}/${height}`;
}

function polyfillImages (items) {
    // I don't have permission to see the images, so let's use kittens instead
    return items.map(obj => {
        const images = Object.keys(obj.images).reduce((prev, key) => {
            const value = obj.images[key];

            prev[key] = {
                ...value,
                url: randomizeKitten({
                    width: value.width,
                    height: value.height,
                })
            };

            return prev
        }, {})

        return {
            ...obj,
            images
        }
    })
}
