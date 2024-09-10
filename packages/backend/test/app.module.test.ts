import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantedCropsModule } from '../src/planted-crops/planted-crops.module';
import { ProducerModule } from '../src/producer/producer.module';
import { SummarizersModule } from '../src/summarizers/summarizers.module';
import { Producer } from '../src/producer/entities/producer.entity';
import { PlantedCrops } from '../src/planted-crops/entities/planted-crops.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      migrations: [],
      entities: [Producer, PlantedCrops],
    }),
    PlantedCropsModule,
    ProducerModule,
    SummarizersModule,
  ],
})
export class AppModuleTest {}
