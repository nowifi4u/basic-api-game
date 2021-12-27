import { ValueTypeError, RequiredParameterError } from './Errors';

const BOOLEAN_TRUTHY: string[] = ['true', 't', 'yes', 'y', 'on', '1'];
const BOOLEAN_FALSY: string[] = ['false', 'f', 'no', 'n', 'off', '0'];

export interface OptionalParseOptions<defT> {
  argumentName?: string;
  defValue?: defT;
}

export function toBoolean<defT>(
  val: string | undefined,
  {
    argumentName,
    truthyValues = BOOLEAN_TRUTHY,
    falsyValues = BOOLEAN_FALSY,
    ...optionals
  }: {
    truthyValues?: string[];
    falsyValues?: string[];
  } & OptionalParseOptions<defT> = {},
): boolean | defT {
  if (val == null || val.length === 0) {
    if ('defValue' in optionals) return optionals.defValue;
    throw new RequiredParameterError(argumentName);
  }
  val = val.toLowerCase();
  if (truthyValues.includes(val)) return true;
  if (falsyValues.includes(val)) return false;
  throw new ValueTypeError(val, 'boolean', argumentName);
}

export function toInt<defT = undefined>(
  val: string | undefined,
  {
    argumentName,
    radix = 10,
    ...optionals
  }: { radix?: number } & OptionalParseOptions<defT> = {},
): number | defT {
  if (val == null || val.length === 0) {
    if ('defValue' in optionals) return optionals.defValue;
    throw new RequiredParameterError(argumentName);
  }
  const num = Number.parseInt(val, radix);
  if (!Number.isNaN(num)) return num;
  throw new ValueTypeError(val, 'int', argumentName);
}

export function parseJSON<defT = undefined>(
  val: string | undefined,
  { argumentName, ...optionals }: OptionalParseOptions<defT> = {},
): ReturnType<JSON['parse']> | defT {
  if (val == null || val.length === 0) {
    if ('defValue' in optionals) return optionals.defValue;
    throw new RequiredParameterError(argumentName);
  }
  try {
    return JSON.parse(val);
  } catch (err) {
    throw new ValueTypeError(val, 'JSON', argumentName);
  }
}
