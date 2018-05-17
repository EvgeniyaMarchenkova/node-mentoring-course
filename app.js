import { Models } from './models/models';
import { DirWatcher } from './dirwatcher';
import { Importer } from './importer';
import { fnc } from './utils/streams';
import * as config from './config/config.json';

const user1 = new Models['User']();
const prod1 = new Models['Product']();
const dirWatcher = new DirWatcher();
const importer = new Importer();
dirWatcher.watch('/data', 1000);

console.log(config['title']);