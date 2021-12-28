import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { nestjsConfig } from './config/nestjs.config';
import * as express from 'express';
import * as http from 'http';
import * as https from 'https';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { ExpressAdapter } from '@nestjs/platform-express';

const nestjsConfigResolved = nestjsConfig();

export async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
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
  await app.init();

  if (nestjsConfigResolved.httpPort) {
    http
      .createServer(nestjsConfigResolved.httpOptions, server)
      .listen(nestjsConfigResolved.httpPort);
  }
  if (nestjsConfigResolved.httpsPort) {
    https
      .createServer(nestjsConfigResolved.httpsOptions, server)
      .listen(nestjsConfigResolved.httpsPort);
  }
}

bootstrap();
