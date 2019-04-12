const path = require('path');
const fs= require('fs');
// const markdownLinkCheck = require('./');
// const chalk = require('chalk');


//Validar que sea un archivo '.md' 
function validateMd(newPath) {
    //path.extname return the extension of the path
     const pathExtencion = path.extname(newPath);
    if (pathExtencion != '.md') {
        console.log('No es un archivo .md');
        return false;
    } else {
        console.log('Si es un archivo markdown');
         return true;
     }
    
};

function absolutesPath(newsPath){
    const absolutePath=path.resolve(newsPath);
    return absolutePath;
}


module.exports = {
    validateMd,
    absolutesPath
}



/*
const chalk = require('chalk');
const fs = require('fs');
const markdownLinkCheck = require('./');
const program = require('commander');
const request = require('request');
const url = require('url');
const path = require('path');

const statusLabels = {
    alive: chalk.green('✓'),
    dead: chalk.red('✖'),
    ignored: chalk.gray('/'),
    error: chalk.yellow('⚠'),
};



function runMarkdownLinkCheck(markdown, opts) {
    markdownLinkCheck(markdown, opts, function (err, results) {
        if (err) {
            console.error(chalk.red('\nERROR: something went wrong!'));
            console.error(err.stack);
            process.exit(1);
        }

        if (results.length === 0 && !opts.quiet) {
            console.log(chalk.yellow('No hyperlinks found!'));
        }
        results.forEach(function (result) {
            // Skip messages for non-deadlinks in quiet mode.
            if (opts.quiet && result.status !== 'dead') {
                return;
            }

            if (opts.verbose) {
                if (result.err) {
                    console.log('[%s] %s → Status: %s %s', statusLabels[result.status], result.link, result.statusCode, result.err);
                } else {
                    console.log('[%s] %s → Status: %s', statusLabels[result.status], result.link, result.statusCode);
                }
            }
            else {
                console.log('[%s] %s', statusLabels[result.status], result.link);
            }
        });
        if (results.some((result) => result.status === 'dead')) {
            console.error(chalk.red('\nERROR: dead links found!'));
            process.exit(1);
        }
    });
}*/