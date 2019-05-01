const validate = require('./validate');
const stats = require('./stats');
const functions = require('./functions');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

let newPath = process.argv[2];
let options = process.argv[3];


// validateMd(newPath);
//   Validar que sea un archivo '.md' functio
function validateMd(newPath, callback) {
  let markdownArray=[];
  let readFiles;
  readFiles=fs.readdir(newPath,(err, files)=> {
    if(err){
      return console.log(err);
      
    }
    files.forEach(file=>{
      if(path.extname(file)== '.md'){
        markdownArray.push(file);
      }
    });
    callback(markdownArray);
  });
  return readFiles;
}

function readFileM (newPath){
  fs.readFile(newPath, 'utf-8', function(err,data) {
    if (err) {
      return console.log(err);
    }
    {
      const toString=data.toString();
      // extrae el texto del link
      const mdLinkRgEx = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g;
      const mdLinkRgEx2 = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;
      console.log('------READ FILE M---------');
      
      const allLinks = toString.match(mdLinkRgEx);
      const urlArray = toString.match(mdLinkRgEx2);
      console.log(`File name: ${newPath}\n`);
      if (urlArray !=null){
        for (let i=0; i<urlArray.length; i++) {
          console.log(`Title: ${allLinks[i]}\n Link:${urlArray[i]}\n fileFound: ${newPath}\n`);
        }
      } 
    }
  })
}

//validar el markdown y muestra el contenido de todos los archivos, llama la  funcion validate
function validateAllLinks (){
  validateMd('./', (array)=>{
    array.forEach(fileName =>{
    validateFile(fileName, function (urls, title, file){
     validate(urls,title,file);
     });
    })
  })
}

// muestra solo el contenido del archivo especificado
function validateLink (fileName){
  readFileM(fileName, (urls, title, file) =>{
    validate(urls, title, file);
  })
}


// muestra el status de cada archivo
function getStats () {
  validateMd('./', (array)=> {
    array.forEach(fileName =>{
      showStats(fileName);
    })
  })
}


function getStatsAndValidate (){
  validateMd('./', (array)=>{
    array.forEach(fileName =>{
      showStats(fileName, true);
    })
  })
}


// function pathExist (newPath){
//    if (fs.exists(newPath)){
//      console.log('No existe el archivo');
//     return true;
//   }else{
//     return false;
//   }
// }





function extractLinks(newPath) {
  //  let returnUrl;
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
  //  showStats(newPath);
    //  return  returnUrl; 
};

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
  // fileOrDirectory,
  readFileM,
  validateAllLinks,
  validateLink,
  validateStats,
  // extraerLinea,
  showStats,
  extractLinks,
  validateFile,
  getStats,
  getStatsAndValidate
  // printLinks
  // validateStats
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
