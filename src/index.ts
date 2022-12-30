import * as dotenvFlow from 'dotenv-flow';
import {z} from 'zod';
import {
  Parser,
  ParserCommandType,
  ParserConfigType,
  ParserConfiguration,
} from './parser';

interface ParseOptions {
  envDirPath?: string;
}

type LoadConfig = (c: ParserConfigType) => Record<string, ParserCommandType>;

export const load = (config: LoadConfig, options?: ParseOptions) => {
  // const dotenvFiles = dotenvFlow.listDotenvFiles(envDirPath || './');
  // console.log(dotenvFiles);

  const dotenvVars = dotenvFlow.config({path: options?.envDirPath}).parsed;
  console.log('dotenvVars', dotenvVars);
  // console.log(process.env);

  const parserConfigResult = config(new ParserConfiguration());
  const parser = Parser.fromConfigObject(parserConfigResult);
  return parser.parse(process.env);
};
