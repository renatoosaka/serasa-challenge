import { Injectable } from '@nestjs/common';
import { PlantedCrops } from './entities/planted-crops.entity';
import { PlantedCrop } from './dtos/planted-crop.dto';

@Injectable()
export class PlantedCropsMapper {
  toHTTP(input: PlantedCrops): PlantedCrop;
  toHTTP(input: Array<PlantedCrops>): Array<PlantedCrop>;

  toHTTP(
    input: PlantedCrops | Array<PlantedCrops>,
  ): PlantedCrop | Array<PlantedCrop> {
    if (Array.isArray(input)) {
      return input.map(this.transformToHTTP);
    }

    return this.transformToHTTP(input);
  }

  private transformToHTTP(input: PlantedCrops): PlantedCrop {
    return {
      id: input.id,
      name: input.name,
    };
  }
}
