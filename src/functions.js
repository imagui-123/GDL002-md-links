const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const chalk = require('chalk');

function validatePath(newPath) {
  if (newPath != null) {
    console.log(chalk.green('✓ You entered a route successfully'));
    return true;
  } else if (newPath === undefined) {
    console.log(chalk.yellow('⚠ Enter a path or directory, example: archivo.md'));
    return false;
  }
}

//   validar que tipo de ruta es
function absoluteOrRelativePath(newPath) {
  absolutePath = newPath;
  if (path.isAbsolute(absolutePath)) {
    return absolutePath;
  }
  return path.resolve(absolutePath);
}

//   Validar que sea un archivo '.md'
function fileValidateMd(newPath) {
  const pathExtencion = path.extname(newPath);
  if (pathExtencion != '.md') {
    console.log(chalk.red('✖ Enter a type file (.md)'));
    return false;
  } else if ('.') {
    return true;
  }
}

function fileOrDirectory(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.access(directoryPath, fs.constants.F_OK | fs.constants.W_OK, err => {
      if (err) {
        console.error(
          chalk.red(`✖ ${directoryPath} ${err.code === 'ENOENT' ? ' Does not exist' : 'it is read-only'}`),
        );
        reject(err);
        //  return false;
      } else {
        console.log(chalk.green(`✔ ${directoryPath} `));
        resolve(true);
        return directoryPath;
      }
    });
  });
}

module.exports = { validatePath, fileOrDirectory, absoluteOrRelativePath, fileValidateMd };
