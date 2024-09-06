import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreatePlantedCropRequestDTO {
  @IsString()
  @MinLength(3)
  @ApiProperty({
    description: 'Name',
    type: 'string',
    example: 'Soja',
  })
  name: string;
}
