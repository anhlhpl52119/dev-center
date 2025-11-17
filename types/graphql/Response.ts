export interface GraphQLSourceLocation {
    readonly line: number;
    readonly column: number;
}

export interface GraphQLError {
    readonly message: string;
    readonly locations?: GraphQLSourceLocation[];
    readonly extensions?: {
        code: string;
        exception?: any;
    };
}

export interface GraphQLResponse<T>{
    data?: T,
    errors?: GraphQLError[]
}
