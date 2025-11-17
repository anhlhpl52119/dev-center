export interface SinglePageByPathSerReq {
    path: string;
    locale: string;
}

export interface VersioningListSerReq {
    id: number;
    getLatest: boolean;
}

export interface SinglePageByVersionSerReq {
    pageId: number;
    versionId: number;
}
