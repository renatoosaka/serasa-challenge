import { Injectable } from '@nestjs/common';
import { Producer as ProducerEntity } from './entities/producer.entity';
import { Producer } from './dtos/producer.dto';
import { PlantedCropsMapper } from 'src/planted-crops/planted-crops.mapper';

@Injectable()
export class ProducerMapper {
  constructor(private readonly plantedCropMapper: PlantedCropsMapper) {}

  toHTTP(input: ProducerEntity): Producer;
  toHTTP(input: Array<ProducerEntity>): Array<Producer>;

  toHTTP(
    input: ProducerEntity | Array<ProducerEntity>,
  ): Producer | Array<Producer> {
    if (Array.isArray(input)) {
      return input.map(this.transformToHTTP.bind(this));
    }

    return this.transformToHTTP(input);
  }

  private transformToHTTP(input: ProducerEntity): Producer {
    return {
      id: input.id,
      document: input.document,
      name: input.name,
      farm: input.farm,
      city: input.city,
      state: input.state,
      area: input.area,
      farmable_area: input.farmableArea,
      vegetation_area: input.vegetationArea,
      planted_crops: this.plantedCropMapper.toHTTP(input.planted_crops),
    };
  }
}
