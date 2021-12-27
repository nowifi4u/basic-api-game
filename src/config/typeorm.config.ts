import { registerAs } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import { parseJSON } from 'src/util/optionalParse';

export const typeormConfig = () =>
  <ConnectionOptions>parseJSON(process.env.TYPEORM_OPTIONS, {
    argumentName: 'DB_OPTIONS',
    defValue: undefined,
  });

export default registerAs('db', typeormConfig);
