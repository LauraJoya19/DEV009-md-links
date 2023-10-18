const { mdLinks } = require('../md-links.js');
const path = require('path');

describe('mdLinks', () => {

  it('Debe rechazar cuando el path no existe', () => {
    return mdLinks ('esta/ruta/noexiste.md').catch((error) => (
      expect(error).toBe("La ruta no existe")
    ));
  });

 it('debería resolver con enlaces si la ruta es un archivo Markdown', () => {
    const filePath = './test/pruebas/prueba1.md'; 
    return expect(mdLinks(filePath)).resolves.toHaveLength(2); 
  });

  it('debería resolver con enlaces si la ruta es un directorio con archivos Markdown', () => {
    const filePath2 = './test/pruebas';
    return expect(mdLinks(filePath2)).resolves.toHaveLength(5); 
  });

  it('debería rechazar la promesa si no se encuentran archivos', () => {
    const emptyDir = './test/pruebas/prueba';
    return expect(mdLinks(emptyDir)).rejects.toBe('No se encontraron archivos');
  });

  it('debería rechazar la promesa si el archivo no es Markdown', () => {
    const nonMarkdownFile = './test/pruebas/prueba4.doc';
    return expect(mdLinks(nonMarkdownFile)).rejects.toBe('El archivo no es markdown');
  });

});

   


