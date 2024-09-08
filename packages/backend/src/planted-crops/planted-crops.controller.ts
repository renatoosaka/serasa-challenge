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
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PlantedCropsService } from './planted-crops.service';
import { PlantedCrop } from './dtos/planted-crop.dto';
import { CreatePlantedCropRequestDTO } from './dtos/request/create.dto';
import { PlantedCropsMapper } from './planted-crops.mapper';
import { ListPlanetCropResponseDTO } from './dtos/response/list.dto';
import { UpdatePlantedCropRequestDTO } from './dtos/request/update.dto';

@ApiTags('planted-crops')
@Controller('planted-crops')
export class PlantedCropsController {
  constructor(
    private readonly plantedCropsService: PlantedCropsService,
    private readonly plantedCropsMapper: PlantedCropsMapper,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'List of planet crop',
    type: ListPlanetCropResponseDTO,
  })
  async list(): Promise<ListPlanetCropResponseDTO> {
    const data = await this.plantedCropsService.list();
    return {
      data: this.plantedCropsMapper.toHTTP(data),
    };
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Planted Crop',
    type: PlantedCrop,
  })
  async save(@Body() body: CreatePlantedCropRequestDTO): Promise<PlantedCrop> {
    const data = await this.plantedCropsService.create(body);
    return this.plantedCropsMapper.toHTTP(data);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Planet crop detail',
    type: PlantedCrop,
  })
  @ApiNotFoundResponse({
    description: 'Planet crop not found',
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
  async show(@Param('id') id: string): Promise<PlantedCrop> {
    const data = await this.plantedCropsService.show(id);

    if (!data) {
      throw new NotFoundException();
    }

    return this.plantedCropsMapper.toHTTP(data);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Planet crop',
    type: PlantedCrop,
  })
  @ApiNotFoundResponse({
    description: 'Planet crop not found',
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
    @Body() body: UpdatePlantedCropRequestDTO,
  ): Promise<PlantedCrop> {
    const data = await this.plantedCropsService.update(id, body);

    if (!data) {
      throw new NotFoundException();
    }

    return this.plantedCropsMapper.toHTTP(data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Planet crop deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Planet crop not found',
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
  async delete(@Param('id') id: string): Promise<void> {
    const data = await this.plantedCropsService.delete(id);
    if (!data) {
      throw new NotFoundException();
    }

    return;
  }
}
