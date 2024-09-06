import { ApiProperty } from '@nestjs/swagger';

export class PlantedCrop {
  @ApiProperty({
    description: 'Id',
    type: 'string',
    example: '1c98d2b5-ad06-4380-88be-3aa767555a1a',
  })
  id: string;

  @ApiProperty({
    description: 'Name',
    type: 'string',
    example: 'Soja',
  })
  name: string;
}
