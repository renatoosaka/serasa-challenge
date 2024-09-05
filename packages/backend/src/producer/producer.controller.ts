import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('producer')
@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Get()
  async list() {}

  @Post()
  async save() {}

  @Get(':id')
  async show() {}

  @Put(':id')
  async update() {}

  @Delete(':id')
  async delete() {}
}
