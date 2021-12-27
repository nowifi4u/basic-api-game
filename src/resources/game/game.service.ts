import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, Repository } from 'typeorm';
import { Publisher } from '../publisher/entities/publisher.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import * as TimeConstants from 'time-constants';
import { QueryFailedErrorDuplicateCatcher } from 'src/util/Errors';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<{ id: number }> {
    const result = await this.gameRepository
      .insert(createGameDto)
      .catch(QueryFailedErrorDuplicateCatcher);
    return {
      id: result.identifiers?.[0]?.id,
    };
  }

  async findAll(): Promise<{ data: Game[] }> {
    return {
      data: await this.gameRepository.find({ relations: ['publisher'] }),
    };
  }

  async findOne(id: number): Promise<{ data: Game | undefined }> {
    return {
      data: await this.gameRepository.findOne(id, { relations: ['publisher'] }),
    };
  }

  async findByIds(ids: number[]): Promise<{ data: Game[] }> {
    return {
      data: await this.gameRepository.findByIds(ids, {
        relations: ['publisher'],
      }),
    };
  }

  async findOnePublisher(id: number): Promise<{ data: Publisher | undefined }> {
    const game = await this.gameRepository.findOne(id, {
      relations: ['publisher'],
    });
    return {
      data: game?.publisher,
    };
  }

  async update(
    id: number,
    updateGameDto: UpdateGameDto,
  ): Promise<{ ok: boolean }> {
    const result = await this.gameRepository.update(id, updateGameDto);
    return {
      ok: Boolean(result.affected),
    };
  }

  async remove(id: number): Promise<{ ok: boolean }> {
    const result = await this.gameRepository.delete(id);
    return {
      ok: Boolean(result.affected),
    };
  }

  async task_purge_and_discount(): Promise<{ affected: number }> {
    const now = new Date();
    const now12monthAgo = new Date(
      now.getTime() - 12 * TimeConstants.AVERAGE_MONTH,
    );
    const now18monthAgo = new Date(
      now.getTime() - 18 * TimeConstants.AVERAGE_MONTH,
    );

    const results = await Promise.all([
      this.gameRepository
        .createQueryBuilder('purger18')
        .delete()
        .where({ releaseDate: LessThan(now18monthAgo) })
        .execute(),

      this.gameRepository
        .createQueryBuilder('discount12')
        .update()
        .where({ releaseDate: Between(now12monthAgo, now18monthAgo) })
        .set({
          discount: 0.2,
        })
        .execute(),
    ]);
    return {
      affected: results.reduce((sum, cur) => sum + cur.affected, 0),
    };
  }
}
