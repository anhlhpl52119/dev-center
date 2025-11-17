import { defineStore } from 'pinia';
import { FormatResponse } from 'seed-core';

import { useAPIEndPoints } from '@/composables/useAPIEndPoints';
import { useRequest } from '@/composables/useRequest';
import { APIKeys } from '@/constants/ApiKeys';
import { CommonTimeout } from '@/constants/ApiTimeout';
import { RequestMethod } from '@/constants/Axios';
import { PiniaStoreKeys } from '@/constants/PiniaStoreKeys';
import { getDevSiteProductsQuery } from '@/graphql/queries/home-page';
import { mappingListPageFeatures } from '@/services/page/PageMapper';
import type { GNBSerReq } from '@/types/graphql/home-page/Request';
import type { DevSiteProductsRes } from '@/types/graphql/home-page/Response';
import type { GraphQLResponse } from '@/types/graphql/Response';
import type { FeaturesModel, FormatFetchAPI } from '@/types/pages/DocModel';

export const useHomePageStore = defineStore(PiniaStoreKeys.homePage, () => {
  const apiBaseUrl = useAPIEndPoints().apiBaseGraphQLWikiJs;

  const fetchDevSiteProducts = async (locale: string): Promise<FormatFetchAPI<FeaturesModel[]>> => {
    const rs: FormatFetchAPI<FeaturesModel[]> = {
      data: [],
      errMsg: ''
    };

    const variables : GNBSerReq = { tags: [`section-dev-products-${locale}`] };

    const graphqlQuery = {
      query: getDevSiteProductsQuery,
      variables
    };

    try {
      const { data } = await useRequest<GraphQLResponse<DevSiteProductsRes>>(
        apiBaseUrl,
        {
          method: RequestMethod.POST,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          formatResponse: FormatResponse.Custom,
          data: JSON.stringify(graphqlQuery),
          timeout: CommonTimeout
        },
        APIKeys.devSiteProducts
      );

      if (data && data?.data?.pages?.menu) {
        rs.data = mappingListPageFeatures(data?.data?.pages?.menu);
      } else {
        rs.errMsg = 'launcher.dev-center.error.E499';
      }

      return rs;
    } catch (e: any) {
      // When there's an HTTP error code, like when the API returns 400...
      errorLog('fetchDevSiteProducts Errors from API:', e);
      rs.errMsg = 'api-returncode.E500';
      return rs;
    }
  };

  return {
    fetchDevSiteProducts
  };
});
