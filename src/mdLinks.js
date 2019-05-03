const validate = require('./validate');
const stats = require('./stats');
const functions = require('./functions');
let path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const chalk = require('chalk');

let newPath = process.argv[2];

function mdLinks(newPath) {
  if (newPath === undefined) {
    return console.log(chalk.red('✖ Ingresa una ruta o un directorio'));
  }
  functions.absoluteOrRelativePath(newPath);
  mdTrue = functions.fileValidateMd(newPath);
  if (mdTrue == true) {
     readFileM(newPath);
     return (`File name: ${newPath}\n`);
   }
}


function validateMd(newPath, callback) {
  let markdownArray = [];
  let readFiles;
  readFiles = fs.readdir(newPath, (err, files) => {

    if (err) {
      console.log('Algo anda mal');
      return console.log(chalk.red('✖' + err));
    } else {
      files.forEach(file => {
        if (path.extname(file) == '.md') {
          markdownArray.push(file);
        }
      })
    }   
    callback(markdownArray);
  })
  // return readFiles;
}

//   Validar que sea un archivo '.md' functio
let options = process.argv[3];
function readFileM(newPath) {
 
  fs.readFile(newPath, 'utf-8', function(err, data) {
    if (err) {
      return console.log(chalk.red('\nERROR: ' + err));
    }
     {
      const toString = data.toString();
      // extrae el texto del link
      const mdLinkRgEx = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g;
      const mdLinkRgEx2 = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;

      const allLinks = toString.match(mdLinkRgEx);
      const urlArray = toString.match(mdLinkRgEx2);
      // console.log(`File name: ${newPath}\n`);
      if (urlArray != null) {
        for (let i = 0; i < urlArray.length; i++) {
          console.log(chalk.white(`Title: ${allLinks[i]}`));
          console.log(chalk.blue(`Link:${urlArray[i]}`));
          console.log(chalk.cyan(`fileFound: ${newPath}\n`));
           
        }
       
        if (process.argv[3] === '--validate') {
          validateAllLinks(urlArray);
          return urlArray;
        } else if (process.argv[3] === '--stats') {
          //  stats.statsLinks(urlArray);
          getStats(urlArray);
          return urlArray;
        } else if (process.argv[3] === '--validate--stats') {
          //  stats.validateStats(urlArray);
          getStatsAndValidate(urlArray);
          return urlArray;
        }
      }
    
    }
  });
}

//validar el markdown y muestra el contenido de todos los archivos, llama la  funcion validate
function validateAllLinks() {
  validateMd('./', array => {
    array.forEach(fileName => {
      validate.validateLinks(fileName, function(urls, text, file) {
        validate.validateStatus(urls, text, file);
      });
    });
  });
}

// muestra solo el contenido del archivo especificado
// function validateLink(fileName) {
//   readFileM(fileName, (urls, text, file) => {
//     validate.validateStatus(urls, text, file);
//   });
// }

// muestra el status de cada archivo
function getStats() {
  validateMd('./', array => {
    array.forEach(fileName => {
      stats.statsLinks(fileName);
    });
  });
}

function getStatsAndValidate() {
  validateMd('./', array => {
    array.forEach(fileName => {
      stats.statsLinks(fileName, true);
    });
  });
}

 console.log(mdLinks(newPath));

module.exports = {
  mdLinks,
  readFileM,
  validateMd,
  validateAllLinks,
  // validateLink,
  getStats,
  getStatsAndValidate,

};

// function readDirectory(newPath){
//   fs.readdir(process.argv[2], function(err,data))
//   let list= fs.readdir(newPath);
//   console.log(newPath);
//   list.forEach( (file) => {
//      file= newPath + '/' + file;
//      console.log(file)
//      let stat= fs.statSync(file);
//       if(stat && stat.isDirectory()){
//         results=results.concat(walk(file));
//       } else {
//         result.push(file);
//       }
//   });
//   console.log(results);
//   return results;
// }


