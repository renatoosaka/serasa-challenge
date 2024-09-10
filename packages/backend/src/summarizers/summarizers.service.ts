import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChartsBy, TotalBy } from './dtos/charts.enum';
import { Producer } from '../producer/entities/producer.entity';
import { ChartsResponseDTO } from './dtos/response/charts.dto';
import { PlantedCrops } from '../planted-crops/entities/planted-crops.entity';
import { TotalResponseDTO } from './dtos/response/total.dto';

@Injectable()
export class SummarizersService {
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,

    @InjectRepository(PlantedCrops)
    private readonly plantedCropRepository: Repository<PlantedCrops>,
  ) {}

  async charts(type: ChartsBy) {
    if (type === ChartsBy.state) {
      return this.chartsByState();
    }

    if (type === ChartsBy.crop) {
      return this.chartsByCrop();
    }

    return this.chartsByArea();
  }

  async total(type: TotalBy) {
    if (type === TotalBy.farm) {
      return this.totalByFarm();
    }

    return this.totalByArea();
  }

  private async chartsByState(): Promise<Array<ChartsResponseDTO>> {
    const data = await this.producerRepository
      .createQueryBuilder('producer')
      .select('producer.state', 'state')
      .addSelect('COUNT(producer.state)', 'total')
      .groupBy('producer.state')
      .getRawMany();

    return data.map((item) => ({
      id: item.state,
      label: item.state,
      value: Number(item.total),
    }));
  }

  private async chartsByArea(): Promise<Array<ChartsResponseDTO>> {
    const data = await this.producerRepository
      .createQueryBuilder('producer')
      .select('SUM(producer.farmableArea)', 'total_farmable_area')
      .addSelect('SUM(producer.vegetationArea)', 'total_vegetation_area')
      .getRawOne();

    return [
      {
        id: 'farmable_area',
        label: 'Área agricultável',
        value: data.total_farmable_area,
      },
      {
        id: 'vegetation_area',
        label: 'Área de vegetação',
        value: data.total_vegetation_area,
      },
    ];
  }

  private async chartsByCrop(): Promise<Array<ChartsResponseDTO>> {
    const data = await this.plantedCropRepository
      .createQueryBuilder('planted_crop')
      .leftJoinAndSelect('planted_crop.producers', 'producer')
      .select('planted_crop.name', 'name')
      .addSelect('COUNT(producer.id)', 'count')
      .groupBy('planted_crop.id')
      .addGroupBy('planted_crop.name')
      .getRawMany();

    return data.map((item) => ({
      id: item.name,
      label: item.name,
      value: Number(item.count),
    }));
  }

  private async totalByFarm(): Promise<TotalResponseDTO> {
    const data = await this.producerRepository
      .createQueryBuilder('producer')
      .select('COUNT(producer.id)', 'count')
      .getRawOne();

    return {
      total: data.count,
    };
  }
  private async totalByArea(): Promise<TotalResponseDTO> {
    const data = await this.producerRepository
      .createQueryBuilder('producer')
      .select('SUM(producer.area)', 'total')
      .getRawOne();

    return {
      total: data.total,
    };
  }
}
