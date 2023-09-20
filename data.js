// se lee archivo y se extrae links

const fs = require('fs');
const MarkdownIt = require('markdown-it');

// Leer el archivo
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


module.exports = { fileContent, extractLinks, };