import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './resources/game/game.module';
import { PublisherModule } from './resources/publisher/publisher.module';
import Config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: Config }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('db'),
        autoLoadEntities: true,
      }),
    }),
    GameModule,
    PublisherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
