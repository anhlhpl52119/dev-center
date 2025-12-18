import type { DocumentNode } from 'graphql';

export function getQueryFromDocument(gqlDocument: DocumentNode): string {
  return gqlDocument.loc?.source.body || '';
}
