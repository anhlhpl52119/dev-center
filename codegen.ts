import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './graphql/schema.graphql',
  documents: ['./graphql/queries/*.gql'],
  generates: {
    './graphql/generated/codegen-typescript.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-generic-sdk',
      ],
      config: {
        skipTypename: true, // https://the-guild.dev/graphql/codegen/plugins/typescript/typescript#skiptypename
        extractAllFieldsToTypes: true,
      },
    },
  },
};

export default config;
