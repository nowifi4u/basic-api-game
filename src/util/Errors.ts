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
