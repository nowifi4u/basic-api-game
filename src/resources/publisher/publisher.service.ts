import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publisher } from './entities/publisher.entity';
import { Repository } from 'typeorm';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { QueryFailedErrorDuplicateCatcher } from 'src/util/Errors';

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(Publisher)
    private publisherRepository: Repository<Publisher>,
  ) {}

  async create(
    createPublisherDto: CreatePublisherDto,
  ): Promise<{ id: number }> {
    const result = await this.publisherRepository
      .insert(createPublisherDto)
      .catch(QueryFailedErrorDuplicateCatcher);
    return {
      id: result.identifiers?.[0]?.id,
    };
  }

  async findAll(): Promise<{ data: Publisher[] }> {
    return {
      data: await this.publisherRepository.find(),
    };
  }

  async findOne(id: number): Promise<{ data: Publisher | undefined }> {
    return {
      data: await this.publisherRepository.findOne(id),
    };
  }

  async update(
    id: number,
    updatePublisherDto: UpdatePublisherDto,
  ): Promise<{ ok: boolean }> {
    const result = await this.publisherRepository.update(
      id,
      updatePublisherDto,
    );
    return {
      ok: Boolean(result.affected),
    };
  }

  async remove(id: number): Promise<{ ok: boolean }> {
    const result = await this.publisherRepository.delete(id);
    return {
      ok: Boolean(result.affected),
    };
  }
}
