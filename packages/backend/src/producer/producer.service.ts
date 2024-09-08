import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from './entities/producer.entity';
import { validateCPF } from '../utils/cpf';
import { validateCNPJ } from '../utils/cnpj';
import { CreateProducerRequestDTO } from './dtos/request/create.dto';
import { PlantedCropsService } from '../planted-crops/planted-crops.service';
import { UpdateProducerRequestDTO } from './dtos/request/update.dto';

const CPF_LENGTH = 11;
const CNPJ_LENGTH = 14;

@Injectable()
export class ProducerService {
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
    private readonly plantedCropService: PlantedCropsService,
  ) {}

  private validate(input: Producer): Array<Record<string, string>> {
    const response: Array<Record<string, string>> = [];

    if (
      input.document.length !== CPF_LENGTH &&
      input.document.length !== CNPJ_LENGTH
    ) {
      response.push({
        message: 'Document length is not valid.',
      });
    }

    if (input.document.length === CPF_LENGTH && !validateCPF(input.document)) {
      response.push({
        message: 'Document is not a valid CPF',
      });
    }

    if (
      input.document.length === CNPJ_LENGTH &&
      !validateCNPJ(input.document)
    ) {
      response.push({
        message: 'Document is not a valid CNPJ',
      });
    }

    return response;
  }

  async list(): Promise<Array<Producer>> {
    const data = await this.producerRepository.find({
      relations: ['planted_crops'],
      order: {
        name: 'ASC',
      },
    });

    return data;
  }

  async create(input: CreateProducerRequestDTO): Promise<Producer> {
    const planted_crops = await this.plantedCropService.fromIds(
      input.planted_crops,
    );

    const data = this.producerRepository.create({
      area: input.area,
      city: input.city,
      state: input.state,
      document: input.document,
      farm: input.farm,
      farmableArea: input.farmable_area,
      vegetationArea: input.vegetation_area,
      name: input.name,
      planted_crops: planted_crops,
    });

    const validate = this.validate(data);

    if (validate.length) {
      throw new BadRequestException(validate);
    }

    await this.producerRepository.save(data);

    const producer = await this.producerRepository.findOne({
      where: {
        id: data.id,
      },
      relations: ['planted_crops'],
    });

    return producer;
  }

  async show(id: string): Promise<Producer | null> {
    const data = await this.producerRepository.findOne({
      where: {
        id,
      },
      relations: ['planted_crops'],
    });

    return data;
  }

  async update(
    id: string,
    input: UpdateProducerRequestDTO,
  ): Promise<Producer | null> {
    const data = await this.show(id);

    if (!data) return;

    const planted_crops = await this.plantedCropService.fromIds(
      input.planted_crops,
    );

    const updated = await this.producerRepository.save({
      ...data,
      area: input.area,
      city: input.city,
      state: input.state,
      document: input.document,
      farm: input.farm,
      farmableArea: input.farmable_area,
      vegetationArea: input.vegetation_area,
      name: input.name,
      planted_crops: planted_crops,
    });

    return updated;
  }

  async delete(id: string): Promise<Producer | null> {
    const data = await this.show(id);

    if (!data) return null;

    await this.producerRepository.delete(id);

    return data;
  }
}
