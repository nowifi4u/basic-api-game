import { registerAs } from '@nestjs/config';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import { toInt, parseJSON } from 'src/util/optionalParse';
import { ServerOptions as HttpServerOptions } from 'http';
import { ServerOptions as HttpsServerOptions } from 'https';
import { CompressionOptions } from 'compression';

export const nestjsConfig = () => ({
  httpPort: <number | undefined>toInt(process.env.HTTP_PORT, {
    argumentName: 'HTTP_PORT',
    defValue: undefined,
  }),
  httpOptions: <HttpServerOptions | undefined>(
    parseJSON(process.env.HTTP_OPTIONS, {
      argumentName: 'HTTP_OPTIONS',
      defValue: undefined,
    })
  ),
  httpsPort: <number | undefined>toInt(process.env.HTTPS_PORT, {
    argumentName: 'HTTPS_PORT',
    defValue: undefined,
  }),
  httpsOptions: <HttpsServerOptions | undefined>(
    parseJSON(process.env.HTTPS_OPTIONS, {
      argumentName: 'HTTPS_OPTIONS',
      defValue: undefined,
    })
  ),
  options: <NestApplicationOptions | undefined>(
    parseJSON(process.env.NEST_OPTIONS, {
      argumentName: 'NEST_OPTIONS',
      defValue: undefined,
    })
  ),
  compression: <CompressionOptions | undefined>(
    parseJSON(process.env.COMPRESSION_OPTIONS, {
      argumentName: 'COMPRESSION_OPTIONS',
      defValue: undefined,
    })
  ),
  helmet: parseJSON(process.env.HELMET_OPTIONS, {
    argumentName: 'HELMET_OPTIONS',
    defValue: undefined,
  }),
  morgan: <[string?] | undefined>parseJSON(process.env.MORGAN_OPTIONS, {
    argumentName: 'MORGAN_OPTIONS',
    defValue: [],
  }),
});

export default registerAs('nestjs', nestjsConfig);
