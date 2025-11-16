import { createError, getQuery } from 'h3';
import { getPagesBySearchQuery } from '~~/graphql/queries/search';

/**
 * Server-side proxy for the `getSinglePageByPathQuery` GraphQL query.
 * Accepts `path` and optional `locale` via query string or POST body and forwards the
 * request to the configured GraphQL endpoint.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const queryParams = getQuery(event);

  const category = queryParams.category?.toString().trim() ?? '';
  const inCategory = ['web'];
  const locale = queryParams.path?.toString().trim() ?? 'ko';
  const page = Number(queryParams.page?.toString().trim()) || 0;
  const query = queryParams.query?.toString().trim();
  const size = Number(queryParams.size?.toString().trim());

  const graphqlPayload = {
    query: getPagesBySearchQuery,
    variables: {
      category,
      inCategory,
      locale: locale || config.public.defaultLocale,
      page: page ?? 0,
      query: query ?? '',
      size: size ?? 10,
    },
    // variables: {
    //   category: '',
    //   inCategory: ['web'],
    //   locale: 'ko',
    //   page: 0,
    //   query: 'pro',
    //   size: 10,
    // },
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
