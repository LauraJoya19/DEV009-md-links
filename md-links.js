const fs = require("fs");
const path = require('path');
const extMarkdown = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
const { fileContent, extractLinks, linksValidate } = require('./data.js');

const mdLinks = (filePath, options = {}) => {
  return new Promise((resolve, reject) => {
    // Verifica si la ruta es absoluta o la convierte en absoluta
    let verRuta = filePath;
    if (!path.isAbsolute(filePath)) {
      verRuta = path.resolve(filePath);
      console.log("Ruta absoluta: ", verRuta);
    }

    if (fs.existsSync(verRuta)) {
      const extension = path.extname(verRuta).toLowerCase();
      if (extMarkdown.includes(extension)) {
        console.log("Es un archivo Markdown");
        fileContent(verRuta)
          .then((archivoLeido) => {
            extractLinks(archivoLeido, verRuta)
              .then((links) => {
                if (options && options.validate) {
                  linksValidate(links)
                    .then((linksValidados) => {
                      resolve(linksValidados);
                    })
                    .catch((error) => {
                      reject(error);
                    });
                } else {
                  resolve(links);
                }
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
};

module.exports = {
  mdLinks,
};
