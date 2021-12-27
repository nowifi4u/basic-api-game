import { HttpException, HttpStatus } from '@nestjs/common';
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

export function QueryFailedErrorDuplicateCatcher(err: any): never {
  console.log('ERROR', err.message);
  console.log('ERROR', err.parameters);
  if (err instanceof QueryFailedError) {
    if (err.message.startsWith('Duplicate entry')) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Duplicate entry',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  throw err;
}
