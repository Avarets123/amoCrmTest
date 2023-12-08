import { IResponseTokens } from '../interfaces/responseTokens.interface';

export type AuthCacheDataType = Omit<IResponseTokens, 'expires_in'> & {
  client_id: string;
  request_url: string;
};
