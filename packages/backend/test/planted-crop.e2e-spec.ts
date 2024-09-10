import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { AppModuleTest } from './app.module.test';
import { PlantedCropsService } from '../src/planted-crops/planted-crops.service';

describe('Planted Crop (e2e)', () => {
  let app: INestApplication;
  let plantedCropService: PlantedCropsService;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModuleTest],
    }).compile();

    app = moduleFixture.createNestApplication();
    plantedCropService =
      moduleFixture.get<PlantedCropsService>(PlantedCropsService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/planted-crops (POST)', async () => {
    await request(app.getHttpServer())
      .post('/planted-crops')
      .send({
        name: faker.food.vegetable(),
      })
      .expect(201);
  });

  it('/planted-crops (GET)', async () => {
    await request(app.getHttpServer())
      .get('/planted-crops')
      .expect(200)
      .then(({ body }) => {
        expect(body.data.length).toBe(1);
      });
  });

  it('/planted-crops (UPDATE)', async () => {
    const [item] = await plantedCropService.list();
    const name = faker.food.vegetable();

    await request(app.getHttpServer())
      .put(`/planted-crops/${item.id}`)
      .send({
        name,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.name).toBe(name);
      });
  });

  it('/planted-crops (DELET)', async () => {
    const [item] = await plantedCropService.list();

    await request(app.getHttpServer())
      .delete(`/planted-crops/${item.id}`)
      .expect(204)
      .then(async () => {
        const list = await plantedCropService.list();
        expect(list.length).toBe(0);
      });
  });
});
