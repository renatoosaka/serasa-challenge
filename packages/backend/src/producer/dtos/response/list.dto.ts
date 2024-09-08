import { ApiProperty } from '@nestjs/swagger';
import { Producer } from '../producer.dto';

export class ListProducerResponseDTO {
  @ApiProperty({
    description: 'List of producers',
    type: Producer,
    isArray: true,
  })
  data: Array<Producer>;
}
