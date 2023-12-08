import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { RedirectQueryDto } from '../dto/redirectQuery.dto';
import { AmoCrmService } from '../services/amoCrm.service';
import { CacheService } from 'src/infrastructures/cache/cache.service';

@Controller()
export class AmoCrmController {
  constructor(
    private readonly amoCrmService: AmoCrmService,
    private readonly cache: CacheService,
  ) {}

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
