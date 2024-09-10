import { ApiProperty } from '@nestjs/swagger';
import { number } from 'joi';

export class TotalResponseDTO {
  @ApiProperty({
    description: 'Total',
    type: number,
    example: 10,
  })
  total: number;
}
