import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AmoCrmProvider } from './infrastructure/amoCrm.provider';
import { AmoCrmController } from './controllers/amoCrm.controller';
import { AmoCrmService } from './services/amoCrm.service';
export const AMO_CRM_PROVIDER = 'AMO_CRM_PROVIDER';

@Module({
  imports: [HttpModule],
  providers: [AmoCrmService, AmoCrmProvider],
  controllers: [AmoCrmController],
})
export class AmoCrmModule {}
