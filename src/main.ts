import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { nestjsConfig } from './config/nestjs.config';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

const nestjsConfigResolved = nestjsConfig();

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    ...nestjsConfigResolved.options,
    logger: new ConsoleLogger(),
  });
  app.use(helmet(nestjsConfigResolved.helmet));
  app.use(morgan(nestjsConfigResolved.morgan));
  await app.listen(nestjsConfigResolved.port);
}

bootstrap();
