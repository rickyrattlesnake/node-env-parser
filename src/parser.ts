import {z, ZodBoolean, ZodNumber, ZodString, ZodTypeAny} from 'zod';

type AllowedZodTypes = ZodBoolean | ZodNumber | ZodString;

export interface ParserConfigType {
  string: () => ParserCommandType;
  boolean: () => ParserCommandType;
  number: () => ParserCommandType;
}

export interface ParserCommandType {
  _getSchema: () => AllowedZodTypes;
  optional: () => ParserCommandType;
}

export class Parser {
  private _schema: ZodTypeAny;

  static getConfig(): ParserConfigType {
    return new ParserConfiguration();
  }

  static fromConfigObject(config: Record<string, ParserCommandType>) {
    const convertedConfig = Object.fromEntries(
      Object.entries(config).map(([envName, parserCommand]) => [
        envName,
        parserCommand._getSchema(),
      ])
    );
    return new Parser(convertedConfig);
  }

  constructor(config: Record<string, AllowedZodTypes>) {
    this._schema = z.object(config);
  }

  parse(object: Record<string, string | undefined>) {
    return this._schema.parse(object);
  }
}

export class ParserConfiguration implements ParserConfigType {
  number() {
    return new ParserCommand(z.coerce.number());
  }

  boolean() {
    return new ParserCommand(z.coerce.boolean());
  }

  string() {
    return new ParserCommand(z.coerce.string());
  }
}

class ParserCommand implements ParserCommandType {
  constructor(private _schema: ZodString | ZodBoolean | ZodNumber) {}

  _getSchema() {
    return this._schema;
  }

  optional() {
    this._schema.optional();
    return this;
  }
}
