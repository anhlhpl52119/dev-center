export type GraphQLErrorLocation = {
  line: number;
  column: number;
};

export enum GraphQLErrorMessages {
  'Forbidden' = 'Forbidden'
}

export type GraphQLFormattedError = {
  message: string;
  locations?: GraphQLErrorLocation[];
  extensions?: {
    code: string;
    exception: Array<any>
  };
};
