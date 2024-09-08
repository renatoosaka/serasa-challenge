import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProducerService } from './producer.service';
import { CreateProducerRequestDTO } from './dtos/request/create.dto';
import { ProducerMapper } from './producer.mapper';
import { Producer } from './dtos/producer.dto';
import { ListProducerResponseDTO } from './dtos/response/list.dto';
import { UpdateProducerRequestDTO } from './dtos/request/update.dto';

@ApiTags('producer')
@Controller('producer')
export class ProducerController {
  constructor(
    private readonly producerService: ProducerService,
    private readonly producerMapper: ProducerMapper,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'List of producers',
    type: ListProducerResponseDTO,
  })
  async list(): Promise<ListProducerResponseDTO> {
    const data = await this.producerService.list();

    return {
      data: this.producerMapper.toHTTP(data),
    };
  }

  @Post()
  @ApiCreatedResponse({
    description: 'New producer',
    type: Producer,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        error: { type: 'string', example: 'Bad Request' },
        message: { type: 'string', example: 'Not found' },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Internal Server Error' },
      },
    },
  })
  async save(@Body() body: CreateProducerRequestDTO): Promise<Producer> {
    const data = await this.producerService.create(body);

    return this.producerMapper.toHTTP(data);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Producer detail',
    type: Producer,
  })
  @ApiNotFoundResponse({
    description: 'Producer not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Not found' },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Internal Server Error' },
      },
    },
  })
  async show(@Param('id') id: string): Promise<Producer> {
    const data = await this.producerService.show(id);

    if (!data) {
      throw new NotFoundException();
    }

    return this.producerMapper.toHTTP(data);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Producer',
    type: Producer,
  })
  @ApiNotFoundResponse({
    description: 'Producer not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Not found' },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Internal Server Error' },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateProducerRequestDTO,
  ) {
    const data = await this.producerService.update(id, body);

    if (!data) {
      throw new NotFoundException();
    }

    return this.producerMapper.toHTTP(data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Producer deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Producer not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Not found' },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Internal Server Error' },
      },
    },
  })
  async delete(@Param('id') id: string) {
    const data = await this.producerService.delete(id);
    if (!data) {
      throw new NotFoundException();
    }

    return;
  }
}
