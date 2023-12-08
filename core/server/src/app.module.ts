import { Module } from '@nestjs/common';
import { AmoCrmModule } from './modules/amoCrm/amoCrm.module';
import { CacheModule } from './infrastructures/cache/cache.module';
import { ConfigModule } from '@nestjs/config';
import { LoggingModule } from './infrastructures/logging/logging.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule,
    AmoCrmModule,
    LoggingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
