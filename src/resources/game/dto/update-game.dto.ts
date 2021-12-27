import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { CreateGameDto } from './create-game.dto';

export class UpdateGameDto extends PartialType(CreateGameDto) {
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0)
  @Max(1)
  discount?: number;
}
