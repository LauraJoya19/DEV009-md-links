const fs = require('fs');
const path = require('path');
const { linksValidate, extMarkdown, processFile, readDirectories } = require('./data.js'); 

const mdLinks = (filePath, validate) => {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(filePath);
    if (!fs.existsSync(absolutePath)) {
      reject('La ruta no existe');
    }
    const stats = fs.statSync(absolutePath);
    if (stats.isDirectory()) {
      const archivosDirectorio = readDirectories(absolutePath);
      if (archivosDirectorio.length === 0) {
        reject('No se encontraron archivos');
      }
      const filter = archivosDirectorio.filter((file) => {
        const absolutePathDirectory = path.join(absolutePath, file);
        return extMarkdown(absolutePathDirectory);
      });
      const resultDirectory = filter.map((archivoFiltrado) => {
        return new Promise((resolve) => {
          processFile(archivoFiltrado).then((links) => {
            if(validate) {
              linksValidate(links).then((linksValidados) => {
                resolve(linksValidados);
              })
            }else{
              resolve(links);
            }
          })
        })

      })
      Promise.all(resultDirectory).then((links) => {
        resolve(links.flat());
      })
    } else {
      if(extMarkdown(absolutePath)) { 
        processFile(absolutePath).then((links) => {
          if(validate) {
            linksValidate(links).then((linksValidados) => {
              resolve(linksValidados);
            })
          }else{
            resolve(links);
          }
        })
      } else {
        reject ('El archivo no es markdown');
      }
    }
  })
}





module.exports = {
  mdLinks,
}