import type { SinglePageByPathItemSerRes, SinglePageByVersionItemSerRes } from '@/types/graphql/single/Response';

export type FetchSinglePageByVersionOptions = {
    pageId: number,
    versionId: string,
    locale: string,
    timezone: string
};

export type MappingSinglePageByVersionOptions = {
    data: SinglePageByVersionItemSerRes,
    locale: string,
    timezone: string
};

export type FetchSinglePageByPathOptions = {
    path: string,
    locale: string,
    timezone: string
};

export type MappingSinglePageOptions = {
    data: SinglePageByPathItemSerRes,
    locale: string,
    timezone: string
};
