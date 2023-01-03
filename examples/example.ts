import * as path from 'path';
import {load} from '../src/index';

const envs = load(
  t => {
    return {
      TEST_1: t.coerce.number(),
      TEST_2: t.nonEmptyString(),
      TEST_3: t.strictBoolean(),
      TEST_4: t.strictBoolean(),
      TEST_5: t.strictBoolean().optional().default('false'),
    };
  },
  {
    envDirPath: path.join(__dirname, './'),
  }
);

console.log('envs', envs);
