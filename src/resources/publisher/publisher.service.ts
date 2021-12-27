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

  async create(createPublisherDto: CreatePublisherDto) {
    const result = await this.publisherRepository
      .insert(createPublisherDto)
      .catch(QueryFailedErrorDuplicateCatcher);
    return result === false ? false : result.generatedMaps?.[0];
  }

  findAll(): Promise<Publisher[]> {
    return this.publisherRepository.find();
  }

  findOne(id: number): Promise<Publisher> {
    return this.publisherRepository.findOne(id);
  }

  async update(
    id: number,
    updatePublisherDto: UpdatePublisherDto,
  ): Promise<boolean> {
    const result = await this.publisherRepository.update(
      id,
      updatePublisherDto,
    );
    return Boolean(result.affected);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.publisherRepository.delete(id);
    return Boolean(result.affected);
  }
}
