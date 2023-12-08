export interface IRequestTokens {
  client_id: string;
  request_url: string;
  client_secret: string;
  grant_type: string;
  code: string;
  redirect_uri: 'http://localhost:4000/tokens';
}

export interface IRequestRefreshTokens
  extends Omit<IRequestTokens, 'code' | 'redirect_uri'> {
  refresh_token: string;
}
