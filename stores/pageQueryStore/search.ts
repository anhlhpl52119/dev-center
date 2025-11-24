import { useAPIEndPoints } from '@composables/useAPIEndPoints';
import { RequestMethod } from '@constants/Axios';
import { defineStore } from 'pinia';
import { FormatResponse } from 'seed-core';

import { useRequest } from '@/composables/useRequest';
import { APIKeys } from '@/constants/ApiKeys';
import { CommonTimeout } from '@/constants/ApiTimeout';
import { DEFAULT_LOCALE } from '@/constants/Locale';
import { PiniaStoreKeys } from '@/constants/PiniaStoreKeys';
import { getCategoriesQuery, getPagesBySearchQuery } from '@/graphql/queries/search';
import {
  mappingCategories,
  mappingCategoryResultSearch,
  mappingListPageSearch
} from '@/services/page/PageMapper';
import type { GNBSerRes } from '@/types/graphql/home-page/Response';
import type { GraphQLResponse } from '@/types/graphql/Response';
import type { CategoryModel, PageSearchModel, Pagination } from '@/types/pages/DocModel';
import type { PageSearchReq } from '@/types/pages/request/PageSearchReq';

export const useSearchDocsStore = defineStore(PiniaStoreKeys.searchPage, () => {
  const apiBaseUrl = useAPIEndPoints().apiBaseGraphQLWikiJs;

  const fetchCategories = async (locale: string, labelAll: string): Promise<CategoryModel[]> => {
    const rs: CategoryModel[] = [
      {
        id: -1,
        label: labelAll,
        category: ''
      }
    ];
    const variables = { tags: [`gnb-depth1-${locale}`] };

    const graphqlQuery = {
      query: getCategoriesQuery,
      variables
    };

    try {
      const { data } = await useRequest<GraphQLResponse<GNBSerRes>>(
        apiBaseUrl,
        {
          method: RequestMethod.POST,
          headers: {
            'Content-Type': 'application/json'
          },
          formatResponse: FormatResponse.Custom,
          data: JSON.stringify(graphqlQuery),
          timeout: CommonTimeout
        },
        APIKeys.categories
      );
      if (data && data?.data?.pages?.menu) {
        const categories: CategoryModel[] = mappingCategories(data.data.pages.menu);
        rs.push(...categories);
      }

      return rs;
    } catch (e: any) {
      errorLog('fetchCategories Errors from API:', e);
      return rs;
    }
  };

  const fetchPagesBySearch = async (
    searchDocsRq: PageSearchReq,
    paginationRq: Pagination
  ): Promise<PageSearchModel> => {
    const rsDefault: PageSearchModel = {
      list: {},
      pagination: {
        total: 0,
        size: paginationRq.size,
        currentPage: paginationRq.currentPage
      },
      description: {}
    };
    const category: string = searchDocsRq.category?.trim() ?? '';
    const keyword: string = searchDocsRq.query?.trim() ?? '';
    const size: number = paginationRq.size;

    const variables: PageSearchReq = {
      query: keyword,
      locale: searchDocsRq?.locale ?? DEFAULT_LOCALE,
      page: paginationRq.currentPage - 1,
      size,
      category,
      inCategory: searchDocsRq?.inCategory || null
    };

    const graphqlQuery = {
      query: getPagesBySearchQuery,
      variables
    };

    try {
      const { data } = await useRequest<any>(
        apiBaseUrl,
        {
          method: RequestMethod.POST,
          headers: {
            'Content-Type': 'application/json'
          },
          formatResponse: FormatResponse.Custom,
          data: JSON.stringify(graphqlQuery),
          timeout: CommonTimeout
        },
        APIKeys.pageSearch
      );

      const searchResults = data?.data?.pages?.search?.results;
      if (searchResults) {
        const total = data.data.pages.search.totalHits || 0;

        return {
          list: mappingListPageSearch(keyword, searchResults),
          pagination: {
            total,
            currentPage: paginationRq.currentPage,
            size
          },
          description: mappingCategoryResultSearch(data?.data?.pages?.search?.description || {})
        };
      }

      return rsDefault;
    } catch (e: any) {
      errorLog('fetchPagesBySearch Errors from API:', e);
      return rsDefault;
    }
  };

  return {
    fetchPagesBySearch,
    fetchCategories
  };
});
