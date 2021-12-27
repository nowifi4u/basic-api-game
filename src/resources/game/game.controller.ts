import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseArrayPipe,
  ParseIntPipe,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Delete('task_purge_and_discount')
  task_purge_and_discount() {
    return this.gameService.task_purge_and_discount();
  }

  @Put()
  create(
    @Body(new ValidationPipe({ transform: true })) createGameDto: CreateGameDto,
  ) {
    return this.gameService.create(createGameDto);
  }

  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id', new ParseIntPipe()) id: number) {
  //   return this.gameService.findOne(id);
  // }

  @Get(':ids')
  findByIds(
    @Param('ids', new ParseArrayPipe({ items: Number })) ids: number[],
  ) {
    return this.gameService.findByIds(ids);
  }

  @Get(':id/publisher')
  findOnePublisher(@Param('id', new ParseIntPipe()) id: number) {
    return this.gameService.findOnePublisher(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ValidationPipe({ transform: true })) updateGameDto: UpdateGameDto,
  ) {
    return this.gameService.update(id, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.gameService.remove(id);
  }
}
