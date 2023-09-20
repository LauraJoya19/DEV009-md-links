const fs = require("fs");
const path = require('path');
const extMarkdown = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
const { fileContent, extractLinks } = require('./data.js');
const markdownIt = require('markdown-it')();

const mdLinks = (routes, options) => {
  return new Promise((resolve, reject) => {
    let verRuta = routes;
    console.log(verRuta);
    if (!path.isAbsolute(routes)) {
      verRuta = path.resolve(routes);
    }
    console.log("Ruta absoluta: ", verRuta);

    if (fs.existsSync(verRuta)) {
      console.log("La ruta existe");

      const extension = path.extname(verRuta).toLowerCase();
      if (extMarkdown.includes(extension)) {
        console.log("Es un archivo Markdown");

        fileContent(verRuta)
          .then((archivoLeido) => {
            console.log(archivoLeido)
            extractLinks(archivoLeido, verRuta)
              .then((links) => {
                resolve(links);
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("No es un archivo Markdown");
      }
    } else {
      reject("La ruta no existe");
    }
  });
}

module.exports = {
  mdLinks,
}
