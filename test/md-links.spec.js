const { fileOrDirectory, absoluteOrRelativePath }= require('../src/functions');
const nameDirectory='C:/Users/iagui/Documents/Lab_proyecto/GDL002-md-links/src';
const nameFile='README.md';

// test('Shold return write a path name', () => {
//   expect(validateMd()).toBe();
// });

// test('Shold by a file markdown', () => {
//   expect(validateMd('README.md')).toBe(true);
// });

// test('Shold by false, it is not a markdown file', () => {
//   expect(validateMd('index.js')).toBe(false);
// });


test('Shold by a relative path', () => {
  expect(absoluteOrRelativePath('prueba2.md')).toBe('C:\\Users\\iagui\\Documents\\Lab_proyecto\\GDL002-md-links\\prueba2.md');
});

test('Shold by an absolute path', () => {
  expect(absoluteOrRelativePath('README.md')).toBe(
    'C:\\Users\\iagui\\Documents\\Lab_proyecto\\GDL002-md-links\\README.md',);
});


// test('Show a error for the file or directory', () =>{
//   fileOrDirectory('\prueba2.md').then(result => {
//     expect(result).toBe(err);
//   });
// });

test('Show name of file', () =>{
  fileOrDirectory(nameFile).then(result => {
    expect(result).toBe(stats);
  });
});

test('Show name of a directory', () =>{
  fileOrDirectory(nameDirectory).then(result=>{
    expect(result).toBe(true);
  });
});


// test('Should read the complete path', () => {
//   readCompletePath('.\prueba.md').then(result => {
//     expect(result).toBe(err);
//   });
// });

// test('Should read the complete path', () => {
//   readCompletePath('./test/prueba.md').then(result => {
//     expect(result).toBe('HOLA');
//   });
// });
