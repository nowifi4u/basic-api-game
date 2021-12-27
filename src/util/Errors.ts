import { QueryFailedError } from 'typeorm';

export class RequiredParameterError extends Error {
  public constructor(argumentName?: string) {
    super(`Argument ${argumentName ? `"${argumentName}" ` : ''}is required`);
  }
}

export class ValueTypeError extends Error {
  public constructor(value: any, type: string, argumentName?: string) {
    super(
      `Invalid argument ${
        argumentName ? `"${argumentName}" ` : ''
      }value for type ${type}: ${String(value)}`,
    );
  }
}

export function QueryFailedErrorDuplicateCatcher(err: any): never | false {
  console.log('ERROR', err.message);
  console.log('ERROR', err.parameters);
  if (err instanceof QueryFailedError) {
    if (err.message.startsWith('Duplicate entry')) {
      return false;
    }
  }
  throw err;
}
