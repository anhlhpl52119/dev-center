export interface LNBModel {
  id: number;
  depth: number;
  title: string;
  pageId: number | null;
  path: string;
  href: string;
  locale?: string;
  isPrivate?: boolean;
  isFolder?: boolean;
  privateNS?: string | null;
  parent?: number | null;
  children?: LNBModel[];
}

export interface Model {
  id: number;
  depth: number;
  title: string;
  pageId: number | null;
  path: string;
  href: string;
  locale?: string;
  isPrivate?: boolean;
  isFolder?: boolean;
  privateNS?: string | null;
  parent?: number | null;
}

export interface BreadcrumbModel {
  id: number;
  label: string;
  href: string;
}
