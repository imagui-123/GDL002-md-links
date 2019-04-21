const path = require('path');
const fs = require('fs');
// md = require('markdown-it')(),
// chalk = require('chalk');

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

//     resultReadFile: function(data){
//     resultReadFile.then(
//     (data)=> { // On Success
//      console.log("resultado =");
//     urlify(data).forEach(link => console.log(link));
//     console.log(urlify);
//    },
//    (err)=> { // On Error
//        console.error(err);
//    })
//  }

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
        readCompletePath(newPath);
      }
    });
  });
}

function readCompletePath(newPath) {
  const filePath = newPath;
  return new Promise((resolve, reject) => {
    fs.readFile(newPath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
         urlify(data, filePath);
      }
    });
  });
}

function urlify(data, filePath) {

  const mdLinkRgEx = /\[(.+?)\]\(.+?\)/g;
  const mdLinkRgEx2 = /\[(.+?)\]\((.+?)\)/;
  
  var allLinks = data.match(mdLinkRgEx);
  var htmlLinks = [];
  for (var x in allLinks) {
    var grpdDta = mdLinkRgEx2.exec(allLinks[x]);
    var linkified = grpdDta[2] + '  --' + grpdDta[1] + ' --' + filePath;
    htmlLinks.push(linkified);
  }
  // console.log(htmlLinks.push(linkified))
  console.log(htmlLinks);
  return htmlLinks;
}

module.exports = {
  validateMd,
  absoluteOrRelativePath,
  readCompletePath,
  // urlify,
  fileOrDirectory
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
