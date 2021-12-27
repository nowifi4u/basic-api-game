import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsDate,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { IsLessThanGenerator } from 'src/util/decorators';
import { GameConfig } from '../entities/game.entity';

export class CreateGameDto {
  @IsString()
  @MaxLength(GameConfig.titleMaxLength)
  title!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price!: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @IsLessThanGenerator(() => new Date(), {
    message: 'releaseDate must be a Date not greater than current Date',
  })
  releaseDate!: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayUnique()
  tags?: string[];

  @IsInt()
  @Min(0)
  publisherId!: number;
}
