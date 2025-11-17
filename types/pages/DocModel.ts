export interface SearchItemModel {
    id: number;
    href: string; //  Front-end redirect link
    path?: string; // Returned by the backend
    content?: string;
    title?: string;
    desc?: string;
    category?: string;
    updatedAt?: string;
    breadcrumb?: string;
}

export interface GNBModel{
    id: number;
    href: string; //  Front-end redirect link
    path?: string; // Returned by the backend
    content?: string;
    title?: string;
    desc?: string;
    category?: string;
    updatedAt?: string;
    breadcrumb?: string;
}
export interface Pagination {
    total: number;
    size: number;
    currentPage: number;
    offsetPage?: number;
    startItem?: number;
    endItem?: number;
}

export type StatsPageSearch = {
    [key: string]: {
        category?: string;
        total?: number;
    };
};

export type CategoryResultSearch = {
    [key: string]: {
        thumbnailMobile: string;
        description: string;
        title: string;
    };
};

export interface PageSearchModel {
    list: Record<string, SearchItemModel[]>;
    pagination: Pagination;
    stats?: StatsPageSearch;
    description: CategoryResultSearch;
}

export interface PageRender {
    pageId: number;
    render: string;
    lastUpdate: string;
    title: string;
    description: string;
    errMsg?: string;
}

export interface BreadcrumbModel {
    id: number;
    label: string;
    href: string
}

export interface VersionModel {
    versionId: number;
    version: string
    versionDate?: string; // Ex: '2023-11-20T05:59:19.258Z'
    authorId?: number;
    authorName?: string,
    actionType?: string,
}

export interface FormatFetchAPI<T> {
    data: T;
    errMsg: string;
}

export interface CategoryModel {
    id: number;
    label: string;
    category: string;
}

export interface PageSingModel {
    id: number;
    content: string;
    updatedAt: string;
    description: string;
    title: string;
}

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

export enum PageTreeMode {
    FOLDERS = 'FOLDERS',
    PAGES = 'PAGES',
    ALL = 'ALL',
    HIERARCHY = 'HIERARCHY',
    LIKE = 'LIKE'
}

export interface FeaturesModel {
    id: number;
    thumbnailMobile: string;
    thumbnailDesktop: string;
    href: string; //  Front-end redirect link
    path?: string; // Returned by the backend
    content?: string;
    title?: string;
    desc?: string;
    category?: string;
    updatedAt?: string;
    breadcrumb?: string;
}
