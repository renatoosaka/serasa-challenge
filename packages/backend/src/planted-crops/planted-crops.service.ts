import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PlantedCrops } from './entities/planted-crops.entity';
import { UpdatePlantedCropRequestDTO } from './dtos/request/update.dto';
import { CreatePlantedCropRequestDTO } from './dtos/request/create.dto';

@Injectable()
export class PlantedCropsService {
  constructor(
    @InjectRepository(PlantedCrops)
    private readonly plantedCropRepository: Repository<PlantedCrops>,
  ) {}

  async list(): Promise<Array<PlantedCrops>> {
    const data = await this.plantedCropRepository.find({
      order: {
        name: 'ASC',
      },
    });

    return data;
  }

  async create(input: CreatePlantedCropRequestDTO): Promise<PlantedCrops> {
    const data = this.plantedCropRepository.create(input);
    const saved = await this.plantedCropRepository.save(data);

    return saved;
  }

  async show(id: string): Promise<PlantedCrops | null> {
    const data = await this.plantedCropRepository.findOne({
      where: {
        id,
      },
    });

    return data;
  }

  async update(
    id: string,
    input: UpdatePlantedCropRequestDTO,
  ): Promise<PlantedCrops | null> {
    const data = await this.show(id);

    if (!data) return;

    const updated = await this.plantedCropRepository.save({
      ...data,
      ...input,
    });

    return updated;
  }

  async delete(id: string): Promise<PlantedCrops | null> {
    const data = await this.show(id);

    if (!data) return null;

    await this.plantedCropRepository.delete(id);

    return data;
  }
}
