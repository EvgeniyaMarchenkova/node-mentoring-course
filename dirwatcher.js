const path = require('path');
const fs = require('fs');
const events = require('events');
const _ = require('lodash');

export const eventEmitter = new events.EventEmitter();

export class DirWatcher {
    constructor() {
        this.listOfFiles = [];
    }

    watch(pathDirectory, delay) {

        const fullPath = __dirname + pathDirectory;
        setInterval(() => {
            fs.readdir(fullPath, (err, list) => {
                if (err) {
                    console.log('Error reading directory ' + path);
                    console.log(err);
                    return;
                }
            if (!_.isEqual(this.listOfFiles, list)) {
                const newFiles = _.difference(list, this.listOfFiles);
                eventEmitter.emit('changed', newFiles);
            }
            this.listOfFiles = list;
            })
        }, delay);
    }
}