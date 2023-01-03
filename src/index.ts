import * as dotenvFlow from 'dotenv-flow';
import {z, ZodType} from 'zod';
import {EnvParseError} from './errors';
import {extendedZod} from './extensions';

interface ParseOptions {
  envDirPath?: string;
}

type AllowedZConfigShape = {
  [k: string]: ZodType<string | number | boolean | undefined>;
};

type LoadConfig<R extends AllowedZConfigShape> = (t: typeof extendedZod) => R;

export function load<R extends AllowedZConfigShape>(
  config: LoadConfig<R>,
  options?: ParseOptions
) {
  const dotenvVars = dotenvFlow.config({path: options?.envDirPath}).parsed;

  console.log('dotenvVars', dotenvVars);

  const schema = z.object(config(extendedZod));

  const result = schema.safeParse(process.env);

  if (!result.success) {
    throw EnvParseError.fromZodError(result.error);
  }

  return result.data;
}
