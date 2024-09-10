import { ApiProperty } from '@nestjs/swagger';
import { PlantedCrop } from '../../planted-crops/dtos/planted-crop.dto';

export class Producer {
  @ApiProperty({
    description: 'Id',
    type: 'string',
    example: '425ca88b-bd9b-40fa-9e93-d741b9122435',
  })
  id: string;

  @ApiProperty({
    description: 'Producer document (CNPJ or CPF), only numbers allowed',
    type: 'string',
    example: '11111111111',
  })
  document: string;

  @ApiProperty({
    description: 'Name',
    type: 'string',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Farm',
    type: 'string',
    example: 'King Ranch',
  })
  farm: string;

  @ApiProperty({
    description: 'City',
    type: 'string',
    example: 'Marília',
  })
  city: string;

  @ApiProperty({
    description: 'State',
    type: 'string',
    example: 'São Paulo',
  })
  state: string;

  @ApiProperty({
    description: 'Total area in hectares of the farm',
    type: 'number',
    example: 200,
  })
  area: number;

  @ApiProperty({
    description: 'Farmable area in hectares',
    type: 'number',
    example: 160,
  })
  farmable_area: number;

  @ApiProperty({
    description: 'Vegetation area in hectares',
    type: 'number',
    example: 10,
  })
  vegetation_area: number;

  @ApiProperty({
    description: 'Planted crops',
    type: PlantedCrop,
    isArray: true,
  })
  planted_crops: PlantedCrop[];
}
