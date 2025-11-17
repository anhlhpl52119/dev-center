import { defineStore } from 'pinia';
import { FormatResponse } from 'seed-core';

import { useAPIEndPoints } from '@/composables/useAPIEndPoints';
import { useRequest } from '@/composables/useRequest';
import { APIKeys } from '@/constants/ApiKeys';
import { CommonTimeout } from '@/constants/ApiTimeout';
import { RequestMethod } from '@/constants/Axios';
import { GraphQLErrorCode } from '@/constants/GraphQL';
import { PiniaStoreKeys } from '@/constants/PiniaStoreKeys';
import {
  getSinglePageByPathQuery,
  getSinglePageByVersionQuery,
  getVersioningListQuery
} from '@/graphql/queries/single-page';
import { mappingHistoryList, mappingSinglePage, mappingSinglePageByVersion } from '@/services/page/PageMapper';
import type { GraphQLResponse } from '@/types/graphql/Response';
import type {
  SinglePageByPathSerReq,
  SinglePageByVersionSerReq,
  VersioningListSerReq
} from '@/types/graphql/single/Request';
import type {
  SinglePageByPathItemSerRes,
  SinglePageByPathSerRes, SinglePageByVersionItemSerRes,
  VersioningListSerRes
} from '@/types/graphql/single/Response';
import type {
  FetchSinglePageByPathOptions,
  FetchSinglePageByVersionOptions, MappingSinglePageByVersionOptions,
  MappingSinglePageOptions
} from '@/types/mapper/single-page';
import type { PageRender, PageSingModel, VersionModel } from '@/types/pages/DocModel';

export const useSinglePageStore = defineStore(PiniaStoreKeys.docPage, () => {
  const loadingDetail = ref<boolean>(true);
  const apiBaseUrl = useAPIEndPoints().apiBaseGraphQLWikiJs;

  const fetchSinglePageByPath = async (options: FetchSinglePageByPathOptions): Promise<PageRender> => {
    loadingDetail.value = true;

    const rs: PageRender = {
      pageId: 0,
      render: '',
      lastUpdate: '',
      title: ''
    };

    const variables: SinglePageByPathSerReq = {
      path: options.path,
      locale: options.locale
    };

    const graphqlQuery = {
      query: getSinglePageByPathQuery,
      variables
    };

    try {
      const { data } = await useRequest<GraphQLResponse<SinglePageByPathSerRes>>(apiBaseUrl, {
        method: RequestMethod.POST,
        headers: {
          'Content-Type': 'application/json'
        },
        formatResponse: FormatResponse.Custom,
        data: JSON.stringify(graphqlQuery),
        timeout: CommonTimeout
      },
      APIKeys.singlePage
      );

      if (data?.errors) {
        const errCode : number = data.errors[0]?.extensions?.exception?.code;

        if (errCode) {
          const getErrMsg : string | undefined = Object.keys(GraphQLErrorCode).find(
            (key : string) => GraphQLErrorCode[key].code === errCode
          );

          if (getErrMsg) {
            rs.errMsg = GraphQLErrorCode[getErrMsg].msg;
          }
        }

        return rs;
      } else {
        const dataServer: SinglePageByPathItemSerRes | undefined = data?.data?.pages?.singleByPath;
        if (dataServer) {
          // Todo check sanitizeHtml
          const mappingOptions : MappingSinglePageOptions = {
            data: dataServer,
            locale: options.locale,
            timezone: options.timezone
          };
          const dataMapper: PageSingModel = mappingSinglePage(mappingOptions);
          rs.render = dataMapper.content;
          rs.pageId = dataMapper.id;
          rs.title = dataMapper.title;
          rs.lastUpdate = dataMapper.updatedAt;
        }

        return rs;
      }
    } catch (e: any) {
      errorLog('fetchSinglePageByPath Errors from API:', e);
      rs.errMsg = 'api-returncode.E500';
      return rs;
    } finally {
      loadingDetail.value = false;
    }
  };

  const fetchVersioningList = async (pageId: number): Promise<VersionModel[]> => {
    let rs: VersionModel[] = [];

    const variables: VersioningListSerReq = {
      id: pageId,
      getLatest: true
    };

    const graphqlQuery = {
      query: getVersioningListQuery,
      variables
    };

    try {
      const { data } = await useRequest<GraphQLResponse<VersioningListSerRes>>(apiBaseUrl, {
        method: RequestMethod.POST,
        headers: {
          'Content-Type': 'application/json'
        },
        formatResponse: FormatResponse.Custom,
        data: JSON.stringify(graphqlQuery),
        timeout: CommonTimeout
      },
      APIKeys.historyList
      );

      const dataServer = data?.data?.pages?.history?.trail;
      if (dataServer) {
        rs = mappingHistoryList(dataServer);
      }

      return rs;
    } catch (e: any) {
      // When there's an HTTP error code, like when the API returns 400...
      errorLog('fetchVersioningList Errors from API:', e);
      return rs;
    }
  };

  const fetchSinglePageByVersion = async (options: FetchSinglePageByVersionOptions): Promise<PageRender> => {
    const rs: PageRender = {
      pageId: options.pageId,
      render: '',
      lastUpdate: '',
      title: ''
    };

    const variables: SinglePageByVersionSerReq = {
      pageId: options.pageId,
      versionId: Number(options.versionId)
    };

    const graphqlQuery = {
      query: getSinglePageByVersionQuery,
      variables
    };

    try {
      const { data } = await useRequest<any>(apiBaseUrl, {
        method: RequestMethod.POST,
        headers: {
          'Content-Type': 'application/json'
        },
        formatResponse: FormatResponse.Custom,
        data: JSON.stringify(graphqlQuery)
      },
      APIKeys.singlePageByVersion
      );

      const dataServer: SinglePageByVersionItemSerRes | undefined = data?.data?.pages?.version;
      if (dataServer) {
        const mappingOptions : MappingSinglePageByVersionOptions = {
          data: dataServer,
          locale: options.locale,
          timezone: options.timezone
        };
        const dataMapper: PageSingModel = mappingSinglePageByVersion(mappingOptions);
        rs.render = dataMapper.content;
        rs.pageId = dataMapper.id;
        rs.title = dataMapper.title;
        rs.lastUpdate = dataMapper.updatedAt;
      }

      return rs;
    } catch (e: any) {
      errorLog('fetchSinglePageByVersion Errors from API:', e);
      return rs;
    }
  };

  return {
    loadingDetail,
    fetchSinglePageByPath,
    fetchVersioningList,
    fetchSinglePageByVersion
  };
});
