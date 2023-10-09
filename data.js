// se lee archivo y se extrae links

const fs = require('fs');
const MarkdownIt = require('markdown-it');
const axios = require("axios");
const path = require('path');

function fileContent(absolutePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(absolutePath, 'utf8', (err, archivoLeido) => {
      if(err){
        reject(err)
      } else {
        resolve(archivoLeido);
      }
    })
  })
}


function extractLinks(archivoLeido, absolutePath) {
  return new Promise((resolve, reject) => {
    const markdownIt = new MarkdownIt();
    const result = markdownIt.parse(archivoLeido);
    const links = [];
    for (let i = 0; i < result.length; i++) {
      const elemento = result[i];
      if (elemento && elemento.type === 'inline' && elemento.content) {
        const linkRegex = /\[(.*?)\]\((.*?)\)/g; // Expresión regular para encontrar enlaces
        let resultContent;
        while ((resultContent = linkRegex.exec(elemento.content)) !== null) {
          const text = resultContent[1];
          const url = resultContent[2];
          links.push({ text: text, href: url, file: absolutePath });
        }
      }
    }
    resolve(links);
  })
}

function linksValidate(links) {
  return new Promise((resolve) => {
    const resultValidate = links.map(link => {
      return axios.get(link.href)
        .then(function (response) {
          return {
            ...link,
            status: response.status,
            ok: 'ok'
          };
        })
        .catch(function (error) {
          return {
            ...link,
            status: error.response ? error.response.status : 404,
            ok: "fail",
          };
        });
    });

   

    Promise.all(resultValidate).then((linksValidados) => {
      resolve(linksValidados);
    });
  });
}


module.exports = { fileContent, extractLinks, linksValidate};