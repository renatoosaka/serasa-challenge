import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { AppModuleTest } from './app.module.test';
import { ProducerService } from '../src/producer/producer.service';
import { PlantedCropsService } from '../src/planted-crops/planted-crops.service';
import { PlantedCrops } from '../src/planted-crops/entities/planted-crops.entity';

describe('Summarizer (e2e)', () => {
  let app: INestApplication;
  let producerService: ProducerService;
  let plantedCropService: PlantedCropsService;
  let plantedCrop: PlantedCrops;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModuleTest],
    }).compile();

    app = moduleFixture.createNestApplication();
    producerService = moduleFixture.get<ProducerService>(ProducerService);
    plantedCropService =
      moduleFixture.get<PlantedCropsService>(PlantedCropsService);

    plantedCrop = await plantedCropService.create({
      name: faker.food.vegetable(),
    });

    await producerService.create({
      document: '80830225005',
      name: faker.person.fullName(),
      farm: 'King Ranch',
      city: 'Marília',
      state: 'SP',
      area: 200,
      farmable_area: 160,
      vegetation_area: 10,
      planted_crops: [plantedCrop.id],
    });

    await producerService.create({
      document: '33076364057',
      name: faker.person.fullName(),
      farm: 'King Ranch',
      city: 'Marília',
      state: 'RJ',
      area: 200,
      farmable_area: 160,
      vegetation_area: 10,
      planted_crops: [plantedCrop.id],
    });

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/summarizers/charts (AREA)', async () => {
    await request(app.getHttpServer())
      .get('/summarizers/charts?type=area')
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(2);
        expect(body).toEqual([
          {
            id: 'farmable_area',
            label: 'Área agricultável',
            value: 320,
          },
          {
            id: 'vegetation_area',
            label: 'Área de vegetação',
            value: 20,
          },
        ]);
      });
  });

  it('/summarizers/charts (STATE)', async () => {
    await request(app.getHttpServer())
      .get('/summarizers/charts?type=state')
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(2);
        expect(body).toEqual([
          {
            id: 'RJ',
            label: 'RJ',
            value: 1,
          },
          {
            id: 'SP',
            label: 'SP',
            value: 1,
          },
        ]);
      });
  });

  it('/summarizers/charts (CROP)', async () => {
    await request(app.getHttpServer())
      .get('/summarizers/charts?type=crop')
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(1);
        expect(body).toEqual([
          {
            id: plantedCrop.name,
            label: plantedCrop.name,
            value: 2,
          },
        ]);
      });
  });

  it('/summarizers/total (AREA)', async () => {
    await request(app.getHttpServer())
      .get('/summarizers/total?type=area')
      .expect(200)
      .then(({ body }) => {
        expect(body.total).toBe(400);
      });
  });

  it('/summarizers/total (FARM)', async () => {
    await request(app.getHttpServer())
      .get('/summarizers/total?type=farm')
      .expect(200)
      .then(({ body }) => {
        expect(body.total).toBe(2);
      });
  });
});
