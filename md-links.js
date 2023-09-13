const fs = require("fs")
const path = require('path');

const mdLinks = (routes, options) => {
return new Promise((resolve, reject) => {
  const verRuta = path.resolve(routes);
  console.log("ruta absoluta ", verRuta);
  if (fs.existsSync(routes)) {
    console.log("si existe")

  }else {
    reject("la ruta no existe");
  }
});
}

module.exports = {
  mdLinks,
}
