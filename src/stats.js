const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const chalk=require('chalk');

//-------------------------- funcion para stats------------
function statsLinks(newPath, needValidation=false){
    fs.readFile(newPath, 'utf-8', (err,data)=>{
      if(err){
        return console.log(chalk.red('✖' + err));
      }
      {
        // console.log('Show the stats');
        const toString =data.toString();
        const regExp= /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;
        // extrae todo lo que hace match regexp con los url
        let url= toString.match(regExp);
        let uniqueUrl;
        
        console.log(`File name: ${newPath}`);
        console.log(chalk.green(' ✔ Total links: '+ ' ' + url.length));
        uniqueUrl= url.filter((currentItem, itemIndex, currentArray) => currentArray.indexOf(currentItem)===itemIndex); 
        // indexOf() retorna el primer índice en el que se puede encontrar un elemento dado en el array
        console.log(chalk.green(' ✔ Total unique Links: ' + " " + uniqueUrl.length + '\n'));
        
        if(needValidation){
          validateStats(uniqueUrl, newPath);
        }
      }
     
    });
   
  }
  
  function validateStats(uniqueUrl, newPath){
    let badLinks=0;
    let goodLinks=0;
    // console.log('VALIDATE and STATS');
    for(let i=0; i<uniqueUrl.length; i++){
      // console.log('Este es el valor de uniqueURL '+ uniqueUrl ); 
      fetch(uniqueUrl[i])
          .then(response => {
            
            if (response.status == 404||response.status == 400) {
              badLinks++;
            }else if (response.status == 200 || response.status==201) {
              goodLinks++;
            }else{
              console.log('ERROR DESCONOCIDO', response.status);
              
            }
            if (goodLinks+badLinks === uniqueUrl.length) {
              console.log(`File: ${newPath} has:`);
              console.log(chalk.green(`✔ Total Funcional Links: ${goodLinks}`));
              console.log(chalk.red(`✖ Total Broken links: ${badLinks}\n`));
            }
          }
        ).catch(function (err){
          console.log(err.message);
          //falta poner el error code refuse
        })
      }
  }

  module.exports={statsLinks,validateStats}