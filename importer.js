const fs = require('fs');
const eventEmitter = require('./dirwatcher').eventEmitter;
const csv = require('csvtojson');
const _ = require('lodash');

const converter = csv();

export class Importer {
    constructor() {
        eventEmitter.on('changed', (arrNewFiles) => {
            this.import(arrNewFiles).then((res) => {
                console.log(res);
            });
        });
    }

    import(files) {
        console.log(files);
        const promiseWithJson = new Promise((resolve, reject) => {
            _.forEach(files, (file) => {
                const pathToFile =__dirname + '/data/' + file;
                csv().fromFile(pathToFile)
                    .on('end_parsed',function(jsonArrayObj){
                        console.log(jsonArrayObj);
                        resolve(jsonArrayObj);
                    })
                    .on('done',(error) => {
                        if(error) {
                            console.log(error);
                            reject('Error with converting ' + pathToFile + '. ' + error);
                        }
                    })
            })
        })
        .catch(err => console.log(err));

        return promiseWithJson;
    }

    // importSync(files) {
    //     _.forEach(files, (file) => {
    //         const pathToFile =__dirname + '/data/' + file;
    //         converter.fromFile(pathToFile)
    //             .on('end_parsed',function(jsonArrayObj){
    //                 // console.log(jsonArrayObj);
    //                 console.log('success');
    //                 return jsonArrayObj;
    //             })
    //             .on('done',(error) => {
    //                 if(error) {
    //                     console.log(error);
    //                     reject('Error with converting ' + pathToFile + '. ' + error);
    //                 }
    //             })
    //     })
    // }
}