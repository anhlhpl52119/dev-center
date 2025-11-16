import { createError, getQuery, readBody } from 'h3';
import { getSinglePageByPathQuery } from '~~/graphql/queries/single-page';

/**
 * Server-side proxy for the `getSinglePageByPathQuery` GraphQL query.
 * Accepts `path` and optional `locale` via query string or POST body and forwards the
 * request to the configured GraphQL endpoint.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const queryParams = getQuery(event);
  const body = event.method === 'POST' ? await readBody<{ path?: string; locale?: string }>(event) : {};

  const path = (body?.path ?? queryParams.path ?? '').toString().trim();
  const locale = (body?.locale ?? queryParams.locale ?? config.public?.defaultLocale ?? '').toString().trim();

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required "path" parameter.',
    });
  }

  if (!config.public?.apiBaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'GraphQL API base URL is not configured.',
    });
  }

  const graphqlPayload = {
    query: getSinglePageByPathQuery,
    variables: {
      path,
      locale: locale || config.public.defaultLocale,
    },
  };

  try {
    const response = await $fetch(`${config.public.apiBaseUrl.replace(/\/$/, '')}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphqlPayload),
    });

    return response;
  }
  catch (error: any) {
    throw createError({
      statusCode: error?.statusCode ?? 500,
      statusMessage: 'Failed to fetch page content.',
      data: error?.data ?? error?.message ?? error,
    });
  }
});
