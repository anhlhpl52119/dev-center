import type { Image } from '@/types/ui';

export interface PageTagRes {
  id: number;
  tag: string;
  title: string;
  createdAt: string; // Date
  updatedAt: string; // Date
}
export interface PageListItemRes {
  id: number;
  path: string;
  locale: string;
  title: string;
  description: string;
  contentType: string;
  isPublished: boolean;
  isPrivate: boolean;
  privateNS: string;
  createdAt: string; // Ex: 2019-02-15T04:22:28.058Z
  updatedAt: string; // Ex: 2019-02-15T04:22:28.058Z
  tags: string[];
  content: string;
  category: string;
  images?: Record<string, Image>;
}

export interface PageRes {
  id: number;
  path: string;
  hash: string;
  title: string;
  description: string;
  isPrivate: boolean;
  isPublished: boolean;
  privateNS: string;
  publishStartDate: string; // Date
  publishEndDate: string; // Date
  tags: PageTagRes[];
  content: string;
  render: string;
  toc: string;
  contentType: string;
  createdAt: string; // Date
  updatedAt: string; // Date
  editor: string;
  locale: string;
  scriptCss: string;
  scriptJs: string;
  authorId: number;
  authorName: string;
  authorEmail: string;
  creatorId: number;
  creatorName: string;
  creatorEmail: string;
}
export interface PageTreeItemRes {
  id: number;
  path: string;
  depth: number;
  title: string;
  isPrivate: boolean;
  isFolder: boolean;
  privateNS: null;
  parent: number;
  pageId: number;
  locale: string;
}

export interface PageHistoryItemRes {
  versionId: number;
  versionDate: number; // Ex: 2019-02-15T04:22:28.058Z
  authorId: string;
  authorName: string;
  actionType: string;
  valueBefore?: string | null;
  valueAfter?: string | null;
  version?: string
}

export interface PageSearchItemRes {
  id: number;
  path: string;
  locale: string;
  title: string;
  description: string;
  contentType: string;
  isPublished: boolean;
  isPrivate: boolean;
  privateNS: string;
  createdAt: string; // Ex: 2019-02-15T04:22:28.058Z
  updatedAt: string; // Ex: 2019-02-15T04:22:28.058Z
  tags: string[];
  content: string;
  category: string;
  breadcrumbs: string;
}

export type CategoryResultSearchRes = {
  [key: string]: {
    description?: string;
    path?: string;
    title?: string;
    images?: Record<string, Image>;
  };
};
