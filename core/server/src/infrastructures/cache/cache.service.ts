import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) public redis: Cache) {}

  async get<RT>(key: string): Promise<RT> {
    return this.redis.get<RT>(key);
  }

  async set<DT>(key: string, value: DT, ttl = -1): Promise<void> {
    await this.redis.set(key, value, ttl);
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
