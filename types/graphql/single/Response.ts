export interface SinglePageByPathItemSerRes{
    id : number;
    title : string;
    content: string;
    description: string;
    updatedAt : string; // Ex: 2019-02-15T04:22:28.058Z
}
export interface SinglePageByPathSerRes{
    pages: {
        singleByPath : SinglePageByPathItemSerRes
    }
}

export interface VersioningListItemSerRes{
    versionId: number;
    versionDate: number; // Ex: 2019-02-15T04:22:28.058Z
    authorId: string;
    authorName: string;
    actionType: string;
    valueBefore?: string | null;
    valueAfter?: string | null;
    version?: string
}

export interface VersioningListSerRes{
    pages: {
        history : {
            trail: VersioningListItemSerRes[]
        }
    }
}

export interface SinglePageByVersionItemSerRes {
    id: number;
    content: string;
    description: string;
    versionDate: string;
    title: string;
}

export interface SinglePageByVersionSerRes {
    pages: {
        version : SinglePageByVersionItemSerRes
    }
}
