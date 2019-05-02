const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');



function validatePath(newPath){
    if(newPath != null){
        // console.log('Ingresaste una ruta');
        return true;
    } else{
        console.log('Ingresa una ruta');
        return false;
    }
}

//   validar que tipo de ruta es
function absoluteOrRelativePath(newPath) {
   absolutePath=newPath;
  // console.log('entra');
    if (path.isAbsolute(absolutePath) === false){
      // console.log('convertir');
      //  console.log(absolutePath +  ' se convirtio en');
      return path.resolve(absolutePath);
     } if (path.isAbsolute(absolutePath) === true) {
      //  console.log('absoluito' + absolutePath);
      return absolutePath;
  }
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
        // console.log('Si es un archivo markdown');
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

  function extractLinks(newPath) {
 
    fs.readFile(newPath, 'utf-8', (err, data) => {
      if (err) {
        return console.log(err);
      }
      {
        console.log('EXTRACTLINKS');
        const toString = data.toString();
        const mdLinkRgEx = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g;
        const mdLinkRgEx2 = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;
  
        const allLinks = toString.match(mdLinkRgEx);
        const urlArray = toString.match(mdLinkRgEx2);
        console.log(`This links are founded in ${mdToRead}\n`);
        if(urlArray!=null){
          for (let i = 0; i < urlArray.length; i++) {
            console.log(
              `Text: ${allLinks[i]}\nLink: ${urlArray[i]}\nFile: ${newPath}\nResponse code: ${
                response.status
              }\nResponse: ${response.statusText}\n`,
            );
        }
      }
     } 
    });
   }

  module.exports={ extractLinks, validatePath, fileOrDirectory, absoluteOrRelativePath, fileValidateMd}