 const { validateMd, absolutesPath } = require('../src/mdLinks.js')

test('Shold by a file markdown', () => {
    expect(validateMd('README.md')).toBe(true);
});


test('Obtein an absoulte path',()=>{
    expect(absolutesPath('README.md')).toBe('C:\\Users\\iagui\\Documents\\Lab_proyecto\\GDL002-md-links\\README.md');
})

















