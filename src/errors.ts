import {ZodError} from 'zod';

export class EnvParseError extends Error {
  static fromZodError(z: ZodError): EnvParseError {
    return new EnvParseError(JSON.stringify(z.issues));
  }
}
