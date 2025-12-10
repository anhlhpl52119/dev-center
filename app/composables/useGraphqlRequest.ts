import type { DefinitionNode, DocumentNode } from 'graphql';
import type { Requester } from '~~/graphql';
import { print } from 'graphql';
import { getSdk } from '~~/graphql';

interface GraphQLResponse<T = any> {
  data?: T;
  errors?: GraphQLError[];
}

interface GraphQLError {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: string[];
  extensions?: Record<string, any>;
}

const validDocDefOps = ['mutation', 'query', 'subscription'];
class GraphQLRequestError extends Error {
  public errors: GraphQLError[];

  constructor(errors: GraphQLError[]) {
    const message = errors.map(e => e.message).join('\n');
    super(message);
    this.name = 'GraphQLRequestError';
    this.errors = errors;

    // Maintain proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GraphQLRequestError);
    }
  }
}

export function useGraphqlRequest() {
  const requester: Requester = async <R, V>(
    doc: DocumentNode,
    variables: V,
  ): Promise<R> => {
    // Validate document contains single query or mutation
    if (
      doc.definitions.filter(
        d =>
          d.kind === 'OperationDefinition'
          && validDocDefOps.includes(d.operation),
      ).length !== 1
    ) {
      throw new Error('DocumentNode must contain single query or mutation');
    }

    const definition = doc.definitions[0] || ({} as DefinitionNode);

    // Validate document contains OperationDefinition
    if (definition.kind !== 'OperationDefinition') {
      throw new Error('DocumentNode must contain single query or mutation');
    }

    // Handle subscription separately
    if (definition.operation === 'subscription') {
      throw new Error(
        'Subscription requests through SDK interface are not supported',
      );
    }

    try {
      const response = await useNuxtApp().$api<GraphQLResponse<R>>('/graphql', {
        method: 'POST',
        body: {
          query: print(doc),
          variables,
        },
      });

      // Handle GraphQL errors
      if (response.errors && response.errors.length > 0) {
        throw new GraphQLRequestError(response.errors);
      }

      // Handle missing data
      if (response.data === undefined || response.data === null) {
        throw new Error('No data presented in the GraphQL response');
      }

      return response.data;
    }
    catch (error) {
      // Re-throw GraphQL errors as-is
      if (error instanceof GraphQLRequestError) {
        throw error;
      }

      // Handle fetch errors
      if (error instanceof Error) {
        throw new TypeError(`GraphQL request failed: ${error.message}`);
      }

      throw error;
    }
  };
  return getSdk(requester);
}
