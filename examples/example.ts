import * as path from 'path';
import {parse} from '../src/index';

parse({path: path.join(__dirname, './')});

console.log('TEST_1', process.env.TEST_1);
console.log('TEST_2', process.env.TEST_2);
console.log('TEST_3', process.env.TEST_3);
