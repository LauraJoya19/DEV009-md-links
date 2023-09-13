// ejecutar el node
const { mdLinks } = require('./md-links.js');

mdLinks('./rutas.md/')
    .then(() => {

    })
    .catch((error) => {
        console.log(error);
    });