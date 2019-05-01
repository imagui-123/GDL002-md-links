const path = require('path');
const fs = require('fs');


function validatePath(newPath){
    if(newPath != null){
        console.log('Ingresaste una ruta');
        return true;
    } else{
        console.log('Ingresa una ruta');
        return false;
        
    }
}

//   validar que tipo de ruta es
function absoluteOrRelativePath(newPath) {
    if (path.isAbsolute(newPath) === false)
      return path.resolve(newPath);
    if (path.isAbsolute(newPath) === true)
      return newPath;
  }

//   Validar que sea un archivo '.md'
function fileValidateMd(newPath) {
    if (newPath === undefined) {
      return console.log('Introduce un directorio');
    } else {
      const pathExtencion = path.extname(newPath);
      if (pathExtencion != '.md') {
        console.log('No es un archivo .md');
        return false;
      } else {
        console.log('Si es un archivo markdown');
        return true;
      }
    }
  }

  function fileOrDirectory(newPath) {
    return new Promise((resolve, reject) => {
      fs.stat(newPath, (err, stats) => {
         if (err) {
           if(err.code==='ENOENT'){
             resolve(false);
           
        }else{
          reject(err);
        }
      }
        if (stats.isDirectory()) {
          console.log('directorio');
          return stats.isDirectory();
        //   return true;
        } 
         else if (stats.isFile()) {
          console.log('es archivo');
          resolve(stats.isFile());
        }
      });
    });
  }

  module.exports={ validatePath, fileOrDirectory, absoluteOrRelativePath, fileValidateMd}