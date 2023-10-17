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
          links.push({ href: url, text: text, file: absolutePath }); 
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
  })
}

function extMarkdown(absolutePath) {
  const archivoMarkdown = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
  const extensionArchivo = path.extname(absolutePath);
  if (archivoMarkdown.includes(extensionArchivo)) {
    return true;
  } else {
    return false;
  }
}

function processFile(absolutePath) {
  return new Promise((resolve, reject) => {
    fileContent(absolutePath).then((archivoLeido) => {
      //console.log('archivoleido', archivoLeido)
      extractLinks(archivoLeido, absolutePath).then((links) => {
       resolve(links);
      })
    })
      .catch((error) => {
        reject(error)
      });
  })
}

function stats(links, validate) {
  const newlinks = links.map((link) => link.href);
  const uniqLinks = new Set(newlinks).size;
  const linksStats = {
    'Total': links.length,
    'Unique': uniqLinks,
  };
  if (validate) {
    return {
      ...linksStats,
      'Broken': links.filter((link) => link.ok === 'fail').length
    }
  }
  return linksStats
}

function readDirectories(absolutePath, arrayOfFiles = []) {
  const archivosDirectorio = fs.readdirSync(absolutePath);
  archivosDirectorio.forEach(file => {
    const absolutePathFile = path.join(absolutePath, file)
		const stat = fs.statSync(absolutePathFile)
		if(stat.isDirectory()){
			readDirectories(absolutePathFile, arrayOfFiles)
		}else{
			arrayOfFiles.push(absolutePathFile)
		}
	}
	)
	return arrayOfFiles
}



module.exports = { fileContent, extractLinks, linksValidate, extMarkdown, processFile, stats, readDirectories }