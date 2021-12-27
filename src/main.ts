import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { nestjsConfig } from './config/nestjs.config';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

const nestjsConfigResolved = nestjsConfig();

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    ...nestjsConfigResolved.options,
    logger: new ConsoleLogger(),
    bufferLogs: true,
  });
  if (nestjsConfigResolved.compression != null) {
    app.use(compression(nestjsConfigResolved.compression));
  }
  if (nestjsConfigResolved.helmet != null) {
    app.use(helmet(nestjsConfigResolved.helmet));
  }
  if (nestjsConfigResolved.morgan != null) {
    app.use(morgan(...nestjsConfigResolved.morgan));
  }
  await app.listen(nestjsConfigResolved.port);
}

bootstrap();
