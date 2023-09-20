const { mdLinks } = require('../md-links.js');
const { fileContent, extractLinks } = require('../data.js');
const filePath = 'rutas.md';


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  it('Debe rechazar cuando el path no existe', () => {
    return mdLinks ('esta/ruta/noexiste.md').catch((error) => (
      expect(error).toBe("La ruta no existe")
    ));
  });

});

describe('fileContent', () => {
  it('Deberia leer el contenido de un archivo', () => {
      return fileContent(filePath)
      .then((content) => {
        expect(typeof content).toBe('string');
      });
  });

  it('Deberia rechazar archivo inexistente', () => {
    const filePath2 = 'ruta/a/un/archivo/inexistente.md';
    return expect(fileContent(filePath2)).rejects.toThrow();
  });
});

describe('extractLinks', () => {
  it('Devuelve un objeto vacio cuando no hay links', () => {
    const markdownContent = 'No hay links en este archivo';
    return extractLinks(markdownContent, 'ruta/al/archivo.md')
      .then((links) => {
        expect(links).toEqual([]);
      });
  });
});
