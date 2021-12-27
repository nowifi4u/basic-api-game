import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';

@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Put()
  create(@Body(new ValidationPipe()) createPublisherDto: CreatePublisherDto) {
    return this.publisherService.create(createPublisherDto);
  }

  @Get()
  findAll() {
    return this.publisherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.publisherService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ValidationPipe()) updatePublisherDto: UpdatePublisherDto,
  ) {
    return this.publisherService.update(id, updatePublisherDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.publisherService.remove(id);
  }
}
