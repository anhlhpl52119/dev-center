export interface PageSearchReq {
  query: string | undefined;
  category: string;
  inCategory?: string[] | null;
  path?: string;
  locale?: string;
  page?: number;
  size?: number;
}
