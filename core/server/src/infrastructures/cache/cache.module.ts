import { Global, Module } from '@nestjs/common';
import { CacheModule as CacheRegisterModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './cache.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    CacheRegisterModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        isGlobal: true,
        store: redisStore.create({
          host: config.get('REDIS_HOST'),
        }),
      }),
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
