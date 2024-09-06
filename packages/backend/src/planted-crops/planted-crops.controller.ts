import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('planted-crops')
@Controller('planted-crops')
export class PlantedCropsController {}
