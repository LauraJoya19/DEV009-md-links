const { mdLinks } = require('../md-links.js');

describe('mdLinks', () => {

  it('Debe rechazar cuando el path no existe', () => {
    return mdLinks ('esta/ruta/noexiste.md').catch((error) => (
      expect(error).toBe("La ruta no existe")
    ));
  });

});

