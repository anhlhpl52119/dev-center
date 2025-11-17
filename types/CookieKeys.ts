export interface CookieKeys {
  [index: string]: any;

  ACCESS_TOKEN?: string;
  REFRESH_TOKEN?: string;
  SDK_ACCESS_TOKEN?: string;
  SDK_REFRESH_TOKEN?: string;
  // (구) 토큰
  HEADER?: string;
  PAYLOAD?: string;
  SIGN?: string;
  OLD_REFRESH_TOKEN?: string;

  FOREVER?: string;
  LOCALE: string;
  LANGUAGE: string;
  NNTO: string;
  COUNTRY: string;
  TIMEZONE: string;
  UTC_OFFSET: string;
  COVERAGES: string;
  UUID?: string;
  ISSDK?: string;
  REGULATION: string;
}
