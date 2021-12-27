import { registerAs } from '@nestjs/config';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import { toInt, parseJSON } from 'src/util/optionalParse';

export const nestjsConfig = () => ({
  port: toInt(process.env.PORT, {
    argumentName: 'PORT',
    defValue: 80,
  }),
  options: <NestApplicationOptions>parseJSON(process.env.NEST_OPTIONS, {
    argumentName: 'NEST_OPTIONS',
    defValue: undefined,
  }),
  compression: parseJSON(process.env.COMPRESSION_OPTIONS, {
    argumentName: 'COMPRESSION_OPTIONS',
    defValue: undefined,
  }),
  helmet: parseJSON(process.env.HELMET_OPTIONS, {
    argumentName: 'HELMET_OPTIONS',
    defValue: undefined,
  }),
  morgan: process.env.MORGAN_OPTIONS,
});

export default registerAs('nestjs', nestjsConfig);
