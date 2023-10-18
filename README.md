# Markdown Links

## Índice

* [1. Resumen del proyecto](#1-resumen-del-proyecto) 
* [2. Herramientas Utilizadas](#2-herramientas-utilizadas)
* [3. Diagrama de Flujo](#3-diagrama-de-flujo)
* [4. Instalación](#4-instalacion)

***

## 1. Resumen del proyecto
Md-Links, es una herramienta de línea de comandos creada usando Node.js que nos permite leer y analizar directorios y/o archivos en formato [Markdown](https://es.wikipedia.org/wiki/Markdown). Mas específicamente la herramienta nos muestra el contenido del archivo y el directorio mediante confirmación de URL, Texto, Ruta, Estado si es valido o invalido y estadísticas del contenido Markdown.

## 2. Herramientas Utilizadas
- **JavaScript**: Desarrollo de la herramienta. 
- **Jest**: Pruebas unitarias de las funciones implementadas en javascript. ![test](/imagenes/test.JPG)
- **GitHub**: Organización del proyecto mediante GitHub Projects ![organización](/imagenes/github.JPG) donde se realiza trazabilidad del avance esperado del proyecto utilizando issues y Milestone.
![milestone](/imagenes/milestone.JPG) 
- **Node.js**: Entorno de ejecución de JavaScript

## 3. Diagrama de Flujo
Diagrama de flujo mediante el cual se evidencia el proceso de uso de la herramienta Md Links
![diagrama](/imagenes/Diagrama.jpg)

## 4. Implementación 
### 4.1 Instalación: 
El usuario debe abrir la terminal e ingresar el siguiente comando
```
npm install LauraJoya19/DEV009-md-links
```
### 4.2 Uso: 
Una vez que mdLinks esté instalado, se utiliza el siguiente comando para analizar el directorio o archivo Markdown:
```
mdlinks <path-to-file> [options]
```
- **path-to-file** : Es la ruta del archivo o directorio a analizar.

- **options** : --validate (Verifica el estado de los links encontrados)     
                --stats (Obtienes estadísticas de los enlaces encontrados).

**Ejemplo**:
```
mdlinks './files/'
```
Con el comando anterior se lee el directorio y se extrae el contenido Markdown
![Sin Validar](/imagenes/directorio.JPG)

para validar el estado de los links ingresamos el siguiente comando 
```
mdlinks './files/' --validate
``` 
![Validate](/imagenes/validate.JPG)

para ver estadisticas de los links encontrados en el directorio ingresamos el siguiente comando 
```
mdlinks './files/' --stats
``` 
![stats](/imagenes/stats.JPG)
utilizando el siguiente comando podemos combinar las dos opciones
```
mdlinks './files/' --validate --stats
``` 
al combinar las opciones, se añade al resultado la propiedad Broken la cual nos muestra si hay algun link roto o dañado.
![Link roto](/imagenes/broken.JPG)
