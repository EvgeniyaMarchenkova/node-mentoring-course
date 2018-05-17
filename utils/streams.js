const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2),{
    alias: {
        a: 'action',
        f: 'file',
        h: 'help',
        p: 'path'
    }
});

const helpMsg = 'Usage: node ./utils/streams.js --action=<command>\n' +
    '\n' +
    'where <command> is one of:\n' +
    '    outputFile, reverse, transform, convertFromFile, convertToFile, cache, completion, config,\n';

const cssCode = '.ngmp18 {\n' +
    '  background-color: #fff;\n' +
    '  overflow: hidden;\n' +
    '  width: 100%;\n' +
    '  height: 100%;\n' +
    '  position: relative;\n' +
    '}\n' +
    '\n' +
    '.ngmp18__hw3 {\n' +
    '  color: #333;\n' +
    '}\n' +
    '\n' +
    '.ngmp18__hw3--t7 {\n' +
    '  font-weight: bold;\n' +
    '}\n';


switch (argv.action) {
    case 'outputFile':
        outputFile(argv.file);
        break;
    case 'reverse':
        reverse('revarg');
        break;
    case 'transform':
        reverse('transform');
        break;
    case 'convertFromFile':
        reverse('convertFromFile');
        break;
    case 'convertToFile':
        reverse('convertToFile');
        break;
    case 'cssBundler':
        if (argv.path) {
            buildCssBundler(argv.path);
        }
        else {
            throw 'please pass the path to file'
        }
        break;
    default:
        showHelpMsg();
}


console.dir(argv);


function reverse(str) {
    console.log(str);
}

function transform(str) { /* ... */ }

function outputFile() {
    console.log('outputFile');
}

function convertFromFile(filePath) { /* ... */ }

function convertToFile(filePath) { /* ... */ }

function showHelpMsg() {
    console.log(helpMsg)
}

function buildCssBundler(folderTitle) {
    const fullPath = __dirname + '/' + folderTitle
    fs.readdir(fullPath, (err, files) => {
        if (err) {
            console.log(err);
        }
        console.log(files);
        let cssFiles = files.filter(file => path.extname(file) === '.css');
        let writeStream = fs.createWriteStream(__dirname + '/' + 'bundle.css');
        writeStream
            .on('error', (err) => {
                console.log(err);
            })
            .on('close', () => {
                console.log("Files copied to bundle");
            })

        cssFiles.forEach(file => {
            let readStream = new fs.ReadStream(__dirname + '/' + folderTitle +  '/' + file);
            readStream
                .on('error', (err) => {
                    console.log(err);
                })
            readStream.pipe(writeStream);
        });
        writeStream.write(cssCode);
        // writeStream.end();
    })

}





