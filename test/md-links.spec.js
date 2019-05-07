const {
  fileOrDirectory,
  absoluteOrRelativePath,
  fileValidateMd,
  validatePath,
} = require('../src/functions');

const nameDirectory = 'C:/Users/iagui/Documents/Lab_proyecto/GDL002-md-links/src';
const nameFile = 'prueba2.md';

test('Should return true to validate path', () => {
  expect(validatePath(nameFile)).toBe(true);
});

test('Should return false to validate path', () => {
  expect(validatePath()).toBe(false);
});

test('Should by a relative path', () => {
  expect(absoluteOrRelativePath(nameFile)).toBe(
    'C:\\Users\\iagui\\Documents\\Lab_proyecto\\GDL002-md-links\\prueba2.md',
  );
});

test('Should by an absolute path', () => {
  expect(absoluteOrRelativePath('prueba2.md')).toBe(
    'C:\\Users\\iagui\\Documents\\Lab_proyecto\\GDL002-md-links\\prueba2.md',
  );
});

test('Shoul be a file Markdown', () => {
  expect(fileValidateMd('text.txt')).toBe(false);
});

test('Shoul be a file Markdown', () => {
  expect(fileValidateMd(nameFile)).toBe(true);
});

test('Show name of file', () => {
  fileOrDirectory('prueba2.md').then(result => {
    expect(result).toBe(false);
  });
});

test('Show name of a directory', () => {
  fileOrDirectory(nameFile).then(result => {
    expect(result).toBe(nameDirectory);
  });
});

// test('Show a error file doesn´t exist', () =>{
//   fileOrDirectory(nameFile).then(result=>{
//     expect(result).contains('ENOENT').cath(error);
//   });
// });

test('Show name of a directory', () => {
  fileOrDirectory(nameFile).then(result => {
    expect(result)
      .contains(`✔ ${nameFile}`)
      .cath(error);
  });
});
