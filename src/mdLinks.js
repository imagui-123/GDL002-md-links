const path = require('path');
const fs = require('fs');
const Marked = require('marked');
const fetch = require('node-fetch');

//   Validar que sea un archivo '.md'
function validateMd(newPath) {
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

//   validar que tipo de ruta es
function absoluteOrRelativePath(newPath) {
  if (path.isAbsolute(newPath) === false)
    return path.resolve(newPath);
  if (path.isAbsolute(newPath) === true)
    return newPath;
}

// function pathExist (newPath){
//    if (fs.exists(newPath)){
//      console.log('No existe el archivo');
//     return true;
//   }else{
//     return false;
//   }
// }

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
        return true;
      } 
      if (stats.isFile()) {
        console.log('es archivo');
        resolve(stats.isFile());
        // readCompletePath(newPath);
      }
    });
  });
}

// esta funcion no nos sirve
// function extraerLinea(newPath) {
//   // return new Promise((resolve, reject)=> {
//     fs.readFile(newPath, 'utf-8', (err,data)=>{
//       if(err){
//         return console.log(err);
//       }
//     readCompletePath(newPath, data)
//     console.log(data + ' ----------------');
    
//     let fileLine = data.split('\n');
//     // console.log('Linea archivo' + lineaArchivo);
//     let extraeLinea = fileLine.map(elemento => {
//       console.log('extrae linea '+ extraeLinea);
//     const lineaNumber = (fileLine.indexOf(elemento) + 1);
//     return extractLinks(newPath, elemento, lineaNumber);
//   });

//     extraeLinea = extraeLinea.filter(e => e.lenght !== 0);
//      console.log('extraelinea ' + extraeLinea);
//     extraeLinea = extraeLinea.reduce((elemento, elementos) => elemento.concat(elementos));
//      console.log(extraeLinea);
//     resolve(extraeLinea);
//   // });
//  });
// };

function readCompletePath(newPath, needValidation=true){
  fs.readFile(newPath, 'utf-8', (err,data)=>{
    if(err){
      return console.log(err);
    }
    {
      console.log('READCOMPLETEPATH');
      
      const toString =data.toString();
      const regExp= /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;
      // extrae todo lo que hace match regexp con los url
      let url= toString.match(regExp);
      let uniqueUrl;
      
      console.log(`File name: ${newPath}`);
      console.log('Total links: '+ ' ' + url.length);
      uniqueUrl= url.filter((currentItem, itemIndex, currentArray) => currentArray.indexOf(currentItem)===itemIndex); // indexOf() retorna el primer índice en el que se puede encontrar un elemento dado en el array
      console.log('Total unique Links: ' + " " + uniqueUrl.length + '\n');
      
        //console.log(needValidation + ' su valor');
         validateStats(uniqueUrl, newPath);

    }
   
  });
 
}

function extractLinks(newPath) {
  // let returnUrl;
  // returnUrl = fs.readFile(newPath, 'utf-8', (err, data) => {
    fs.readFile(newPath, 'utf-8', (err, data) => {
         if (err) {
           reject(err);
         }
         {
           console.log('EXTRACTLINKS');
           
        const toString= data.toString();
        const mdLinkRgEx = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g;
        const mdLinkRgEx2 = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;
  
        const allLinks = toString.match(mdLinkRgEx);
        const urlArray = toString.match(mdLinkRgEx2);
  
        for (let i=0; i< urlArray.length; i++) {
          fetch(urlArray[i])
          .then(response => {
            if (response.status == 200) {
              console.log(`Text: ${allLinks[i]}\nLink: ${urlArray[i]}\nFile: ${newPath}\nResponse code: ${response.status}\nResponse: ${response.statusText}\n`)
            } else if (response.status == 404||response.status == 400) {
              console.log(`ERROR.\nText: ${allLink[i]}\nLink: ${urlArray[i]}\nFile: ${newPath}\nResponse code: ${response.status}\nResponse: ${response.statusText}\n`)
            }
          })
        }
      }
   }) 
    readCompletePath(newPath);
    //  return  returnUrl; 
};

function validateStats(uniqueUrl, newPath){
  let badLinks=0;
  let goodLinks=0;
  console.log('VALIDATESTATS');
  // console.log(uniqueUrl + ' valor de uniqueURL');
  
  for(let i=0; i<uniqueUrl.lenght; i++){
    fetch(uniqueUrl[i])
        .then(response => {
          console.log(uniqueUrl.lenght + ' valor lenght');
          
          if (response.status == 404||response.status == 400) {
            badLinks++;
          }else if (response.status == 200|201) {
            goodLinks++;
          }
          if (goodLinks+badLinks === uniqueUrl.length) {
            console.log(`File: ${newPath} has:`);
            console.log(`Total Functional Links: ${goodLinks}\nTotal Broken links: ${badLinks}\n`);
          }
        }
      );
    }
}

// function readCompletePath(newPath2) {
//  return new Promise((resolve, reject) => {
//    fs.readFile(newPath2, 'utf-8', (err, data) => {
//      if (err) //{
//        reject(err);
//      } else {
//       // console.log(data);
//        resolve(data);
//        extractLinks(data, filePath);
//       }
//    });
//  })
// };






module.exports = {
  validateMd,
  absoluteOrRelativePath,
  fileOrDirectory,
  
  // extraerLinea,
  readCompletePath,
  extractLinks,
  validateStats
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

// module.exports = {
//   validateMd,
//   absolutesPath,
//   readCompletePath,
// };

// const chalk = require('chalk');
// const fs = require('fs');
// const markdownLinkCheck = require('./');
// const program = require('commander');
// const request = require('request');
// const url = require('url');
// const path = require('path');

// const statusLabels = {
//     alive: chalk.green('✓'),
//     dead: chalk.red('✖'),
//     ignored: chalk.gray('/'),
//     error: chalk.yellow('⚠'),
// };

// function runMarkdownLinkCheck(markdown, opts) {
//     markdownLinkCheck(markdown, opts, function (err, results) {
//         if (err) {
//             console.error(chalk.red('\nERROR: something went wrong!'));
//             console.error(err.stack);
//             process.exit(1);
//         }

//         if (results.length === 0 && !opts.quiet) {
//             console.log(chalk.yellow('No hyperlinks found!'));
//         }
//         results.forEach(function (result) {
//             // Skip messages for non-deadlinks in quiet mode.
//             if (opts.quiet && result.status !== 'dead') {
//                 return;
//             }

//             if (opts.verbose) {
//                 if (result.err) {
//                     console.log('[%s] %s → Status: %s %s', statusLabels[result.status], result.link, result.statusCode, result.err);
//                 } else {
//                     console.log('[%s] %s → Status: %s', statusLabels[result.status], result.link, result.statusCode);
//                 }
//             }
//             else {
//                 console.log('[%s] %s', statusLabels[result.status], result.link);
//             }
//         });
//         if (results.some((result) => result.status === 'dead')) {
//             console.error(chalk.red('\nERROR: dead links found!'));
//             process.exit(1);
//         }
//     });
// }
