import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummarizersController } from './summarizers.controller';
import { SummarizersService } from './summarizers.service';
import { Producer } from 'src/producer/entities/producer.entity';
import { PlantedCrops } from 'src/planted-crops/entities/planted-crops.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producer, PlantedCrops])],
  controllers: [SummarizersController],
  providers: [SummarizersService],
  exports: [SummarizersService],
})
export class SummarizersModule {}
