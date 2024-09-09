import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ChartsBy, TotalBy } from './dtos/charts.enum';
import { SummarizersService } from './summarizers.service';

@ApiTags('summarizers')
@Controller('summarizers')
export class SummarizersController {
  constructor(private readonly summarizerService: SummarizersService) {}

  @Get('charts')
  @ApiQuery({
    description: 'Define chart type (default: area)',
    name: 'type',
    enum: ChartsBy,
    example: ChartsBy.area,
    required: false,
  })
  async chartsBy(@Query('type') type: ChartsBy) {
    return this.summarizerService.charts(type);
  }

  @Get('total')
  @ApiQuery({
    description: 'Total type (default: area)',
    name: 'type',
    enum: TotalBy,
    example: TotalBy.area,
    required: false,
  })
  async totalBy(@Query('type') type: TotalBy) {
    return this.summarizerService.total(type);
  }
}
