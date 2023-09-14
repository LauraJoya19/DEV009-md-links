// ejecutar el node
const { mdLinks } = require('./md-links.js');

mdLinks('./rutas.md/')
    .then((resolve) => {
        console.log(resolve);
    })
    .catch((error) => {
        console.log(error);
    });