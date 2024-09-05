import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiOkResponse({
    description: 'Main endpoint',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Serasa Challenge',
        },
        timestamp: {
          type: 'number',
          example: 1725560729996,
        },
      },
    },
  })
  getHello() {
    return {
      message: 'Serasa Challenge',
      timestamp: new Date().getTime(),
    };
  }
}
