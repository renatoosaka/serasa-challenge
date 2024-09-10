import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { AppModuleTest } from './app.module.test';
import { ProducerService } from '../src/producer/producer.service';
import { PlantedCropsService } from '../src/planted-crops/planted-crops.service';
import { PlantedCrops } from '../src/planted-crops/entities/planted-crops.entity';

describe('Producer (e2e)', () => {
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

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/producers (POST)', async () => {
    await request(app.getHttpServer())
      .post('/producers')
      .send({
        document: '80830225005',
        name: faker.person.fullName(),
        farm: 'King Ranch',
        city: 'Marília',
        state: 'SP',
        area: 200,
        farmable_area: 160,
        vegetation_area: 10,
        planted_crops: [plantedCrop.id],
      })
      .expect(201);
  });

  it('/producers (GET)', async () => {
    await request(app.getHttpServer())
      .get('/producers')
      .expect(200)
      .then(({ body }) => {
        expect(body.data.length).toBe(1);
      });
  });

  it('/producers (UPDATE)', async () => {
    const [item] = await producerService.list();
    const name = faker.person.fullName();

    await request(app.getHttpServer())
      .put(`/producers/${item.id}`)
      .send({
        ...item,
        name,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.name).toBe(name);
      });
  });

  it('/producers (DELET)', async () => {
    const [item] = await producerService.list();

    await request(app.getHttpServer())
      .delete(`/producers/${item.id}`)
      .expect(204)
      .then(async () => {
        const list = await producerService.list();
        expect(list.length).toBe(0);
      });
  });
});
