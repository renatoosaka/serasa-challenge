import { ApiProperty } from '@nestjs/swagger';
import { PlantedCrop } from '../planted-crop.dto';

export class ListPlanetCropResponseDTO {
  @ApiProperty({
    description: 'List of planet crop',
    type: PlantedCrop,
    isArray: true,
  })
  data: Array<PlantedCrop>;
}
