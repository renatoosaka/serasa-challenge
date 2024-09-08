import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';
import { Producer } from './entities/producer.entity';
import { PlantedCropsModule } from 'src/planted-crops/planted-crops.module';
import { ProducerMapper } from './producer.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Producer]), PlantedCropsModule],
  controllers: [ProducerController],
  providers: [ProducerService, ProducerMapper],
  exports: [ProducerService, ProducerMapper],
})
export class ProducerModule {}
