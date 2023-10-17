const { fileContent, extractLinks, linksValidate } = require('../data.js');
const filePath = 'rutas.md';
const axios = require('axios');
const path = require('path');
jest.mock('axios');

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
  
  describe('linksValidate', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('Deberia devolver status 200 de el link', () => {
      const absolutePath = path.resolve('./test/fileMocks/fileMock1.md');
      axios.get.mockResolvedValue({ status: 200 });
      const links = [
        {
          text: 'axios',
          href: 'https://axios-http.com',
          file: absolutePath
        },
        {
          text: 'Node',
          href: 'https://nodejs.org/es',
          file: absolutePath
        },
      ]
      return linksValidate(links).then((status) => {
        expect(status).toEqual([
          {
            text: 'axios',
            href: 'https://axios-http.com',
            file: absolutePath,
            status: 200,
            ok: 'ok'
          },
          {
            text: 'Node',
            href: 'https://nodejs.org/es',
            file: absolutePath,
            status: 200,
            ok: 'ok'
          }
        ]
        );
      });
    })
  
    it('Deberia deveria devolver el status 404 del link roto', () => {
      const absolutePath = path.resolve('./test/fileMocks/fileMock.md');
      axios.get.mockImplementationOnce(() => new Promise((resolve, reject) => {
        reject({ response: { status: 404 } })
      }));
      const links = [
        {
          text: 'axios',
          href: 'https://axios-http.',
          file: absolutePath
        }
      ]
      return linksValidate(links).then((error) => {
        expect(error).toEqual([
          {
            text: 'axios',
            href: 'https://axios-http.',
            file: absolutePath,
            status: 404,
            ok: 'fail'
          }
        ]
        );
      });
    })
  
    
  });
  