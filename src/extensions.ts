import {z} from 'zod';

type ZodModule = typeof z;

type ExtendedZodModule = ZodModule & {
  strictBoolean: () => typeof strictBoolean;
  nonEmptyString: () => typeof nonEmptyString;
};

const strictBoolean = z
  .string()
  .refine(
    val =>
      val.toLocaleLowerCase() === 'true' || val.toLocaleLowerCase() === 'false',
    {
      message:
        "boolean environment variables must either be a case insensitive 'true' or 'false' value",
    }
  )
  .transform(val => val.toLocaleLowerCase())
  .transform(val => (val === 'true' ? true : false));

const nonEmptyString = z.string().min(1);

export const extendedZod: ExtendedZodModule = {
  ...z,
  strictBoolean: () => strictBoolean,
  nonEmptyString: () => nonEmptyString,
};
