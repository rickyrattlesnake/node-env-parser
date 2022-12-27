import * as dotenvFlow from 'dotenv-flow';

export const parse = ({path}: {path: string}) =>
  dotenvFlow.config({
    path: path,
  });
