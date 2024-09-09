import { ApiProperty } from '@nestjs/swagger';

export class ChartsResponseDTO {
  @ApiProperty({
    description: 'ID',
    type: 'string',
    example: 'ID',
  })
  id: string;

  @ApiProperty({
    description: 'Label',
    type: 'string',
    example: 'Serasa',
  })
  label: string;

  @ApiProperty({
    description: 'Value',
    type: 'number',
    example: 100,
  })
  value: number;

  @ApiProperty({
    description: 'Color',
    type: 'string',
    example: 'blue',
    required: false,
  })
  color?: string;
}
