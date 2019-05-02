const validate = require('./validate');
const stats = require('./stats');
const functions = require('./functions');
let path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

let newPath = process.argv[2];
// let options = process.argv[3];

function mdLinks(newPath) {
  if (newPath === undefined) {
    return console.log('Ingresa una ruta o un directorio');;
  }
  functions.absoluteOrRelativePath(newPath);
  // console.log(newPath + ' valor absoluto');
  mdTrue = functions.fileValidateMd(newPath);
  if (mdTrue == true) {
    readFileM(newPath);
    return newPath;
  }
};

function validateMd(newPath, callback) {
  let markdownArray = [];
  let readFiles;
  readFiles = fs.readdir(newPath, (err, files) => {

    if (err) {
      console.log('Algo anda mal');
      return console.log(err);
    } else {
      files.forEach(file => {
        if (path.extname(file) == '.md') {
          markdownArray.push(file);
        }
      })
    }
    callback(markdownArray);
  })
  return readFiles;
}

//   Validar que sea un archivo '.md' functio

function readFileM(newPath) {
  fs.readFile(newPath, 'utf-8', function(err, data) {
    if (err) {
      console.log('tenemos un error en readfilem');
      return console.log(err);
    }
     {
      // console.log('------READ FILE M---------');
      const toString = data.toString();
      // extrae el texto del link
      const mdLinkRgEx = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g;
      const mdLinkRgEx2 = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;

      const allLinks = toString.match(mdLinkRgEx);
      const urlArray = toString.match(mdLinkRgEx2);
      console.log(`File name: ${newPath}\n`);
      if (urlArray != null) {
        for (let i = 0; i < urlArray.length; i++) {
          console.log(`Title: ${allLinks[i]}\n Link:${urlArray[i]}\n fileFound: ${newPath}\n`);
        }
        if (process.argv[3] === '--validate') {
          //  validate.validateLinks(urlArray);
           validateAllLinks(urlArray);
          // validate.validateLinks(urlArray);
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
function validateLink(fileName) {
  readFileM(fileName, (urls, text, file) => {
    validate.validateStatus(urls, text, file);
  });
}

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


// function validateStats(uniqueUrl, newPath){
//   let badLinks=0;
//   let goodLinks=0;
//   console.log('VALIDATESTATS');
//   // console.log(uniqueUrl + ' valor de uniqueURL');

//   for(let i=0; i<uniqueUrl.lenght; i++){
//     fetch(uniqueUrl[i])
//         .then(response => {
//           console.log(uniqueUrl.lenght + ' valor lenght');

//           if (response.status == 404||response.status == 400) {
//             badLinks++;
//           }else if (response.status == 200|201) {
//             goodLinks++;
//           }
//           if (goodLinks+badLinks === uniqueUrl.length) {
//             console.log(`File: ${newPath} has:`);
//             console.log(`Total Functional Links: ${goodLinks}\nTotal Broken links: ${badLinks}\n`);
//           }
//         }
//       );
//     }
// }
// validateMd(newPath);
module.exports = {
  mdLinks,
  readFileM,
  validateMd,
  validateAllLinks,
  validateLink,
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

// const fileMd =
// fs.readdir(process.argv[2], function(err,data){
//     console.log(data);
//      data.forEach(function(dat){
//         if (path.extname(dat)=== '.md'){
//             console.log(dat);
//             //console.log(path.extname(dat));
//         }
//     });
// });

// console.log("Going to get file info!");
// fs.stat('test', function (err, stats) {
//    if (err) {
//       return console.error(err);
//    }
//   //  console.log(stats);
//    console.log("Got file info successfully!");

//    // Check file type
//    console.log("isFile ? " + stats.isFile());
//    console.log("isDirectory ? " + stats.isDirectory());
// });