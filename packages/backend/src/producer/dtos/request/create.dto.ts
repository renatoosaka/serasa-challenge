import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumberString,
  IsPositive,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { number } from 'joi';

export class CreateProducerRequestDTO {
  @IsString()
  @IsNumberString()
  @Length(11, 14)
  @ApiProperty({
    description: 'Producer document (CNPJ or CPF), only numbers allowed',
    type: 'string',
    example: '11111111111',
  })
  document: string;

  @IsString()
  @MinLength(3)
  @ApiProperty({
    description: 'Name',
    type: 'string',
    example: 'John Doe',
  })
  name: string;

  @IsString()
  @MinLength(3)
  @ApiProperty({
    description: 'Farm',
    type: 'string',
    example: 'King Ranch',
  })
  farm: string;

  @IsString()
  @MinLength(3)
  @ApiProperty({
    description: 'City',
    type: 'string',
    example: 'Marília',
  })
  city: string;

  @IsString()
  @MinLength(3)
  @ApiProperty({
    description: 'State',
    type: 'string',
    example: 'São Paulo',
  })
  state: string;

  @IsPositive()
  @ApiProperty({
    description: 'Total area in hectares of the farm',
    type: number,
    example: 200,
  })
  area: number;

  @IsPositive()
  @ApiProperty({
    description: 'Farmable area in hectares',
    type: number,
    example: 160,
  })
  farmable_area: number;

  @IsPositive()
  @ApiProperty({
    description: 'Vegetation area in hectares',
    type: number,
    example: 10,
  })
  vegetation_area: number;

  @IsArray()
  @ApiProperty({
    description: 'Planted crops',
    type: 'string',
    isArray: true,
    example: [
      '38e4a8c2-cc6b-446a-bbd2-0f99e55b7fcf',
      'dde806b7-b547-4571-8e68-e15e943dd128',
    ],
  })
  planted_crops: Array<string>;
}
