const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
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
        outputFile(argv.path);
        break;
    case 'reverse':
        reverse('revarg');
        break;
    case 'transform':
        reverse('transform');
        break;
    case 'convertFromFile':
        convertFromFile(argv.file);
        break;
    case 'convertToFile':
        convertToFile(argv.file);
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
    process.stdin.setEncoding('utf8');

    process.stdin.on('readable', () => {
        const chunk = process.stdin.read();
        if (chunk !== null) {
            process.stdout.write(`data: ${chunk}`);
        }
    });

    process.stdin.on('end', () => {
        process.stdout.write('end');
    });
}

function transform(str) { /* ... */ }

function outputFile(filePath) {
    console.log('outputFile');
    const stream = fs.createReadStream(__dirname + '/' + filePath);
    stream.on('error', (err) => {
        console.log(err);
    });
    stream.pipe(process.stdout);

}

function convertFromFile(filePath) {
    console.log(__dirname + '/' + filePath);
    fs.createReadStream(__dirname + '/' + filePath, {encoding: 'utf-8'})
        .pipe(csv())
        .on('data', function (data) {
            process.stdout.write(data.toString());
        });
}

function convertToFile(filePath) {
    const fileName = path.parse(filePath).name;
    console.log(__dirname + '/' + fileName + '.json');
    let writeStream = fs.createWriteStream(__dirname + '/' + fileName + '.json');

    fs.createReadStream(__dirname + '/' + filePath, {encoding: 'utf-8'})
        .pipe(csv())
        .pipe(writeStream);
    // writeStream.end();
}

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





