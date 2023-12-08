import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { RedirectQueryDto } from '../dto/redirectQuery.dto';
import { AmoCrmService } from '../services/amoCrm.service';

@Controller()
export class AmoCrmController {
  constructor(private readonly amoCrmService: AmoCrmService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('tokens')
  async receiveTokens(@Query() query: RedirectQueryDto) {
    await this.amoCrmService.receiveTokens(query);
  }

  @HttpCode(HttpStatus.OK)
  @Get('leads')
  async getDealsInfo() {
    return this.amoCrmService.getAllInfo();
  }
}
