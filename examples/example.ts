import * as path from 'path';
import {load} from '../src/index';

const envs = load(
  parser => {
    return {
      TEST_1: parser.number(),
      TEST_2: parser.string(),
      TEST_3: parser.boolean(),
    };
  },
  {
    envDirPath: path.join(__dirname, './'),
  }
);

console.log('TEST_1', process.env.TEST_1);
console.log('TEST_2', process.env.TEST_2);
console.log('TEST_3', process.env.TEST_3);

console.log('envs', envs);
