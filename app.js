import { Models } from './models/Models';
import * as config from './config/config.json';

const user1 = new Models['User']();
const prod1 = new Models['Product']();

console.log(config['title']);