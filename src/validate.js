const fs = require('fs');
const fetch = require('node-fetch');

//----------function for validate -------------------------
function validateLinks (newPath, callback){
  let returnUrl;
  returnUrl=fs.readFile(newPath, 'utf-8', function(err,data) {
    if (err) {
      return console.log(err);
    }
    {
      const toString=data.toString();
      // extrae el texto del link
      const mdLinkRgEx = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g;
      const mdLinkRgEx2 = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;
      console.log('------READ FILE MD show validate---------');
      
      const text = toString.match(mdLinkRgEx);
      const urlArray = toString.match(mdLinkRgEx2);
      console.log(`File name: ${newPath}\n`);
      if (urlArray !=null){
        
      } 
      callback(urlArray, text, newPath);
    }
  })
  return returnUrl;
}

function  validateStatus (urlArray, text, newPath){
  for (let i=0; i< urlArray.length; i++) {
    fetch(urlArray[i])
    .then(response => {
      if (response.status == 200) {
        console.log(`Title: ${text[i]}\nLink: ${urlArray[i]}\nFile Found: ${newPath}\nResponse code: ${response.status}\nResponse: ${response.statusText}\n`)
      } else if (response.status == 404 || response.status == 400) {
        console.log(`ERROR.\nTitle: ${text[i]}\nLink: ${urlArray[i]}\nFile Found: ${newPath}\nResponse code: ${response.status}\nResponse: ${response.statusText}\n`)
      }
    }).catch((err) =>{
      console.log(err.message);
  })
}
}

module.exports= {validateLinks, validateStatus};

// function validateLinks (newPath){
//   fs.readFile(newPath, 'utf-8', function(err,data) {
//     if (err) {
//       return console.log(err);
//     }
//     {
//       const toString=data.toString();
//       // extrae el texto del link
//       const mdLinkRgEx = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g;
//       const mdLinkRgEx2 = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;
//       console.log('------READ FILE MD show validate---------');
      
//       const allLinks = toString.match(mdLinkRgEx);
//       const urlArray = toString.match(mdLinkRgEx2);
//       console.log(`File name: ${newPath}\n`);
//       if (urlArray !=null){
//         for (let i=0; i< urlArray.length; i++) {
//           fetch(urlArray[i])
//           .then(response => {
//             if (response.status == 200) {
//               console.log(`Title: ${allLinks[i]}\nLink: ${urlArray[i]}\nFile Found: ${newPath}\nResponse code: ${response.status}\nResponse: ${response.statusText}\n`)
//             } else if (response.status == 404 || response.status == 400) {
//               console.log(`ERROR.\nTitle: ${allLinks[i]}\nLink: ${urlArray[i]}\nFile Found: ${newPath}\nResponse code: ${response.status}\nResponse: ${response.statusText}\n`)
//             }
//           }).catch((err) =>{
//             console.log(err.message);
//         })
//       }
//       } 
//     }
//   })
// }