const { fileContent, extractLinks, linksValidate, extMarkdown, processFile, stats, readDirectories } = require('../data.js');
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
    const absolutePath = path.resolve('./test/pruebas/prueba1.md');
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
    const absolutePath = path.resolve('./test/pruebas/prueba1.md');
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

describe('extMarkdown', () => {
  it('deberia retornar true o false para una extencion markdwon valida o invalida', () => {
    expect(extMarkdown('archivo.md')).toBe.true;
    expect(extMarkdown('documento.pdf')).toBe.false;

  });
});

describe('processFile', () => {
  it('deberia resolver con un array de links', (done) => {
    const absolutePath = './test/pruebas/prueba2.mkd';
    processFile(absolutePath)
      .then((links) => {

        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  

});

describe('stats', () => {
  it('Deberia retornar el total de links, links unicos y links rotos de un archivo', () => {
     const links = [
      {
        href: 'https://docs.github.com/es/issues',
        text: 'issues',
        file: 'C:\\Users\\Laboratoria\\Documents\\GitHub\\DEV009-md-links\\test\\pruebas\\prueba2.mkd',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://github.com/markedjs/maked',
        text: 'marked',
        file: 'C:\\Users\\Laboratoria\\Documents\\GitHub\\DEV009-md-links\\test\\pruebas\\prueba2.mkd',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://github.com/markedjs/maked',
        text: 'marked',
        file: 'C:\\Users\\Laboratoria\\Documents\\GitHub\\DEV009-md-links\\test\\pruebas\\prueba2.mkd',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://gib.com/markedjs/maked',
        text: 'marked',
        file: 'C:\\Users\\Laboratoria\\Documents\\GitHub\\DEV009-md-links\\test\\pruebas\\prueba2.mkd',
        status: 400,
        ok: 'fail'
      },
    ]
    expect(stats(links, true)).toStrictEqual({ "Total": 4, "Unique": 3, "Broken": 1});
  })

});

describe('readDirectories', () => {
  it('Deberia retornar una serie de rutas de archivos de un directorio', () => {
    const directoryPath = './test/pruebas';
    const files = readDirectories(directoryPath);
    expect(files).toHaveLength(5);
  });
});



