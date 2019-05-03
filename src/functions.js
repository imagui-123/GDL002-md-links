const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const chalk = require('chalk');


function validatePath(newPath){
    if(newPath != null){
        console.log(chalk.green('✓ Ingresaste una ruta exitosamente'));
        return true;
    } else if (newPath === undefined){
        console.log(chalk.yellow('⚠ Ingresa una ruta o un directorio ejemplo: archivo.md'));
        return false;
    }
}

//   validar que tipo de ruta es
function absoluteOrRelativePath(newPath) {
   absolutePath=newPath;
    if (path.isAbsolute(absolutePath)){
      return absolutePath;
     } 
    //  if (path.isAbsolute(absolutePath) === true) {
      return path.resolve(absolutePath);
  // }
}


//   Validar que sea un archivo '.md'
function fileValidateMd(newPath) {
      const pathExtencion = path.extname(newPath);
      if (pathExtencion != '.md') {
        console.log(chalk.red('✖ Ingresa un archivo de tipo markdown(.md)'));
        return false;
      } else if ('.') {
          // console.log('Si es un archivo markdown');
        return true;
      }
  }

  function fileOrDirectory(directoryPath) {
    return new Promise((resolve, reject) => {
      fs.access(directoryPath, fs.constants.F_OK | fs.constants.W_OK, (err)=>{
         if (err) {
          console.error(chalk.red(
            `✖ ${directoryPath} ${err.code === 'ENOENT' ? 'No existe' : 'is read-only'}`));
             reject(err);
           return;
        }
        else{
            console.log(chalk.green(`✔ ${directoryPath} `));
                console.log(directoryPath);
                resolve(true);
                return directoryPath;
        }
      });
    });
  }

  // function fileOrDirectory(absolutePath,arrayFile_){
 
  //   arrayFile_ = arrayFile_ || [];
  //   const expRegMarkdown = /.\.(m|M(?:d|D?markdown)?)|text$/g;
  //   const route = fs.statSync(absolutePath);
  
  //   if (route.isDirectory()) {
  //       const listFile = fs.readdirSync(absolutePath);
  //       listFile.forEach((file) => {
  //        const newPath = path.join(absolutePath, file);
  //       fileOrDirectory(newPath, arrayFile_);
  //       return true;
  //       });
        
  //   } else if (route.isFile() && expRegMarkdown.test(path.basename(absolutePath))) {
  //       // console.log(absolutePath + ' absoluteOath');
  //       arrayFile_.push(absolutePath);
  //   }
  //   return arrayFile_;
  // };


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
        // console.log(`This links are founded in ${newPath}\n`);
        if(urlArray!=null){
          for (let i = 0; i < urlArray.length; i++) {
            console.log(`Text: ${allLinks[i]}\nLink: ${urlArray[i]}\nFile: ${newPath}\n`);
        }
      }
     } 
    });
   }

  module.exports={ extractLinks, validatePath, fileOrDirectory, absoluteOrRelativePath, fileValidateMd}