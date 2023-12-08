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

  async getAndSetCache<T>(
    key: string,
    cb: () => Promise<T>,
    resetCache = false,
    ttl?: number,
  ): Promise<T> {
    const cache = await this.get(key);

    if (cache && !resetCache) return cache as T;

    const newCache = await cb();

    const day = 1000 * 60 * 60 * 24;

    await this.set(key, newCache, ttl || day);

    return newCache as T;
  }
}
