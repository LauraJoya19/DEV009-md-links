// ejecutar el node
const { mdLinks } = require('./md-links.js');

mdLinks('./rutas.md/')
    .then((links) => {
        console.log(links);
    })
    .catch((error) => {
        console.log(error);
    });