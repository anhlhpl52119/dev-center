import { APIKeys } from '@constants/ApiKeys';
import { defineStore } from 'pinia';
import { FormatResponse } from 'seed-core';

import { useAPIEndPoints } from '@/composables/useAPIEndPoints';
import { useRequest } from '@/composables/useRequest';
import { CommonTimeout } from '@/constants/ApiTimeout';
import { RequestMethod } from '@/constants/Axios';
import { PiniaStoreKeys } from '@/constants/PiniaStoreKeys';
import { getLNBQuery } from '@/graphql/queries/lnb';
import { mappingLNB } from '@/services/page/PageMapper';
import type { LNBModel } from '@/types/pages/DocModel';
import { PageTreeMode } from '@/types/pages/DocModel';
import { StringUtil } from '@/utils/sgvn/string';

export const useLNBStore = defineStore(PiniaStoreKeys.lnb, () => {
  const lnbRoot = ref<LNBModel>();
  const lnb = ref<LNBModel[]>();
  const loadingLNB = ref<boolean>(true);
  const apiBaseUrl = useAPIEndPoints().apiBaseGraphQLWikiJs;

  const fetchLNB = async (path: string, locale: string): Promise<LNBModel[]> => {
    loadingLNB.value = true;
    let rs: LNBModel[] = [];

    // Path '' then it will get all the entire page, thus blocking the user from editing the path and not being able to get the API
    if (StringUtil.getInstance().isEmpty(path)) {
      return rs;
    }

    const variables = {
      path,
      mode: PageTreeMode.LIKE,
      locale
    };

    const graphqlQuery = {
      query: getLNBQuery,
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
        APIKeys.lnb
      );

      if (data && data?.data?.pages?.tree) {
        const treesLNB = data.data.pages.tree;
        const pathGlossary : string = 'common/glossary';
        if (path === pathGlossary) {
          const filterTreeLNB = treesLNB.filter((item : any) => item.path === pathGlossary);
          rs = mappingLNB(filterTreeLNB);
        } else {
          rs = mappingLNB(treesLNB);
        }

        lnbRoot.value = treesLNB.find((item: LNBModel) => item.depth === 1);
      }

      return rs;
    } catch (e: any) {
      // When there's an HTTP error code, like when the API returns 400...
      errorLog('fetchLNB Errors from API:', e);
      return rs;
    } finally {
      loadingLNB.value = false;
    }
  };

  return {
    loadingLNB,
    lnbRoot,
    lnb,
    fetchLNB
  };
});
