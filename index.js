// ejecutar el node
const { mdLinks } = require('./md-links');
const filePath = './rutas.md';
const options = { validate: true }; 

mdLinks(filePath, options)
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error);
  });
