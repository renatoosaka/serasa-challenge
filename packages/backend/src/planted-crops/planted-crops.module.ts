import { Module } from '@nestjs/common';
import { PlantedCropsController } from './planted-crops.controller';
import { PlantedCropsService } from './planted-crops.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantedCrops } from './entities/planted-crops.entity';
import { PlantedCropsMapper } from './planted-crops.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([PlantedCrops])],
  controllers: [PlantedCropsController],
  providers: [PlantedCropsService, PlantedCropsMapper],
  exports: [PlantedCropsService, PlantedCropsMapper],
})
export class PlantedCropsModule {}
