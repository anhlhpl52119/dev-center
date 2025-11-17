import { defineStore } from 'pinia';
import { FormatResponse } from 'seed-core';

import { useAPIEndPoints } from '@/composables/useAPIEndPoints';
import { useRequest } from '@/composables/useRequest';
import { APIKeys } from '@/constants/ApiKeys';
import { CommonTimeout } from '@/constants/ApiTimeout';
import { RequestMethod } from '@/constants/Axios';
import { PiniaStoreKeys } from '@/constants/PiniaStoreKeys';
import { getGNBMenusQuery } from '@/graphql/queries/home-page';
import { mappingGNB } from '@/services/page/PageMapper';
import type { GNBSerReq } from '@/types/graphql/home-page/Request';
import type { GNBSerRes } from '@/types/graphql/home-page/Response';
import type { GraphQLResponse } from '@/types/graphql/Response';
import type { GNBModel } from '@/types/pages/DocModel';

export const useGNBStore = defineStore(PiniaStoreKeys.gnb, () => {
  const apiBaseUrl = useAPIEndPoints().apiBaseGraphQLWikiJs;
  const fetchGNBMenus = async (locale: string) : Promise<GNBModel[]> => {
    let rs : GNBModel[] = [];

    const variables : GNBSerReq = { tags: [`gnb-depth1-${locale}`] };

    const graphqlQuery = {
      query: getGNBMenusQuery,
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
        APIKeys.gnbHeader
      );
      if (data && data?.data?.pages?.menu) {
        rs = mappingGNB(data.data.pages.menu);
      }
      return rs;
    } catch (e: any) {
      // When there's an HTTP error code, like when the API returns 400...
      console.error('fetchGNBMenus Errors from API:', e);
      return rs;
    }
  };

  return {
    fetchGNBMenus
  };
});
