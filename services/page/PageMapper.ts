import type { DevSiteProductRes, GNBItemSerRes } from '@/types/graphql/home-page/Response';
import type { VersioningListItemSerRes } from '@/types/graphql/single/Response';
import type {
  MappingSinglePageByVersionOptions,
  MappingSinglePageOptions
} from '@/types/mapper/single-page';
import type {
  CategoryModel,
  CategoryResultSearch,
  FeaturesModel,
  LNBModel,
  PageSingModel,
  SearchItemModel,
  VersionModel
} from '@/types/pages/DocModel';
import type {
  CategoryResultSearchRes,
  PageSearchItemRes,
  PageTreeItemRes
} from '@/types/pages/reponse/ServerResponse';
import type { Image } from '@/types/ui';
import { formatLastUpdateContentPage } from '@/utils/DateUtil';
import { capitalizeFirstLetter, createHrefLNB, highlightKeyword } from '@/utils/StringUtil';

export const mappingSinglePage = (options: MappingSinglePageOptions): PageSingModel => {
  return {
    id: options.data.id,
    content: options.data.content,
    description: options.data.description,
    updatedAt: formatLastUpdateContentPage(options.data.updatedAt, {
      locale: options.locale,
      zoneName: options.timezone
    }),
    title: options.data.title
  };
};

export const mappingSinglePageByVersion = (
  options: MappingSinglePageByVersionOptions
): PageSingModel => {
  return {
    id: options.data.id,
    content: options.data.content,
    description: options.data.description,
    updatedAt: formatLastUpdateContentPage(options.data.versionDate, {
      locale: options.locale,
      zoneName: options.timezone
    }),
    title: options.data.title
  };
};

/**
 * Build a hierarchical tree structure from a flat array of menu data.
 * Limit from depth 2  -> depth 6
 * @param {PageTreeItemRes[]} menuData - The flat array of menu data.
 * @returns {LNBModel[]} - The hierarchical tree structure.
 */
const buildLNBTree = (menuData: PageTreeItemRes[]): LNBModel[] => {
  const filteredData: PageTreeItemRes[] = menuData.filter(
    (item: PageTreeItemRes) => item.depth > 1 && item.depth <= 6
  );
  const sortedData: PageTreeItemRes[] = filteredData.sort(
    (a: PageTreeItemRes, b: PageTreeItemRes) => a.depth - b.depth
  );

  const tree: LNBModel[] = [];
  const menuMap: Record<string, LNBModel> = {};
  const startDepth: number = 2;

  for (const item of sortedData) {
    const title: string = capitalizeFirstLetter(item.title);
    const href: string = createHrefLNB(item.path);

    const menuItem: LNBModel = {
      id: item.id,
      depth: item.depth,
      path: item.path,
      href,
      title,
      parent: item.parent,
      pageId: item.pageId,
      isFolder: item.isFolder,
      children: []
    };
    menuMap[item.id] = menuItem;

    if (item.depth === startDepth) {
      tree.push(menuItem);
    } else {
      const parentItem = menuMap[item.parent];

      if (parentItem) {
        parentItem.children = parentItem.children || [];
        parentItem.children.push(menuItem);
      } else {
        const temporaryParent: LNBModel = {
          id: item.parent,
          depth: item.depth + 1,
          path: '',
          href: '',
          title: '',
          parent: 0,
          pageId: 0,
          children: [menuItem]
        };

        tree.push(temporaryParent);
        menuMap[item.parent] = temporaryParent;
      }
    }
  }

  return tree;
};
/**
 * LNB is only obtained starting from depth 2
 * @param {PageTreeItemRes[]} pageRes
 * @return {LNBModel[]}
 */
export const mappingLNB = (pageRes: PageTreeItemRes[]): LNBModel[] => {
  return buildLNBTree(pageRes);
};

export const mappingGNB = (pageRes: GNBItemSerRes[]): SearchItemModel[] => {
  const rs: SearchItemModel[] = [];
  pageRes.forEach((item: GNBItemSerRes, _index: number) => {
    const title: string = capitalizeFirstLetter(item.title);

    const href: string = `/docs/${item.path}`;

    const pageModel: SearchItemModel = {
      id: item.id,
      path: item.path,
      href,
      title,
      category: item.category
    };
    rs.push(pageModel);
  });
  return rs;
};

export const mappingCategories = (pageRes: GNBItemSerRes[]): CategoryModel[] => {
  const rs: CategoryModel[] = [];
  pageRes.forEach((item: GNBItemSerRes) => {
    const categoryModel: CategoryModel = {
      id: item.id,
      label: item.title,
      category: item.category
    };
    rs.push(categoryModel);
  });
  return rs;
};

export const mappingListPageSearch = (
  keyword: string,
  pageRes: Record<string, PageSearchItemRes[]>
): Record<string, SearchItemModel[]> => {
  return Object.keys(pageRes).reduce((acc: Record<string, SearchItemModel[]>, key: string) => {
    const pageItems = pageRes[key];
    acc[key] = pageItems.map((pageItem: PageSearchItemRes) => {
      const href = createHrefLNB(pageItem?.path || '');

      const pageModel: SearchItemModel = {
        id: pageItem.id,
        href,
        path: pageItem.path,
        title: pageItem.title,
        desc: pageItem.description,
        breadcrumb: pageItem.breadcrumbs,
        content: highlightKeyword(keyword, pageItem.content)
      };
      return pageModel;
    });
    return acc;
  }, {});
};

export const mappingHistoryList = (pageRes: VersioningListItemSerRes[]): VersionModel[] => {
  // const rs : VersionModel[] = [
  //   { version: '1.0.0', versionId: 1 },
  //   { version: '1.1.0', versionId: 2 },
  //   { version: '1.2.0', versionId: 3 },
  //   { version: '2.0.0', versionId: 4 },
  //   { version: '2.1.0', versionId: 5 }
  // ];
  const rs: VersionModel[] = [];
  pageRes.forEach((item: VersioningListItemSerRes) => {
    const versionItem: VersionModel = {
      version: item?.version ?? '',
      versionId: item.versionId
    };
    rs.push(versionItem);
  });
  return rs;
};

/**
 * Extracts the image URL based on a specific keyword from Record<string, Image>.
 * @param {object} images - The content string to search for the image URL.
 * @param {string} keyword - The keyword to identify the image (e.g., "PC" or "MOBILE").
 * @returns {string} - The extracted image URL or '' if not found.
 */
const getImageSrc = (images: Record<string, Image> | undefined, keyword: string): string => {
  return images && images[keyword]?.src ? images[keyword].src : '/';
};

export const mappingListPageFeatures = (pageRes: DevSiteProductRes[]): FeaturesModel[] => {
  const rs: FeaturesModel[] = [];
  pageRes.forEach((pageItem: DevSiteProductRes) => {
    const href: string = `/docs/${pageItem.path}`;
    const thumbnailDesktop: string = getImageSrc(pageItem?.images, 'pc');
    const thumbnailMobile: string = getImageSrc(pageItem?.images, 'mobile');

    const pageModel: FeaturesModel = {
      id: pageItem.id,
      href,
      path: pageItem.path,
      title: pageItem.title,
      desc: pageItem.description,
      thumbnailMobile,
      thumbnailDesktop
    };
    rs.push(pageModel);
  });

  return rs;
};

export const mappingCategoryResultSearch = (input: CategoryResultSearchRes) => {
  const output: CategoryResultSearch = {};

  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      if (typeof input[key] === 'object' && input[key] !== null) {
        const inputElement = input[key];
        const thumbnailMobile = getImageSrc(inputElement?.images, 'mobile');
        output[key] = {
          description: inputElement?.description || '',
          title: inputElement?.title || '',
          thumbnailMobile
        };
      }
    }
  }

  return output;
};
