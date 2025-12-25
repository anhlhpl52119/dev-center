import type { LNBItem, LNBTree } from './index';
import { isNil, isNotNil } from 'es-toolkit';
import { PageTreeMode } from '~~/graphql';

export function useLnb() {
  const { LeftNavigationBarTree } = useGraphqlRequest();

  const localePath = useLocalePath();
  const route = useRoute();
  const { locale } = useI18n();

  const rawLnbList = ref<LNBItem[]>([]);
  const lnbTree = computed<LNBTree[]>(() => convertToTree(rawLnbList.value));
  const itemIdMap = new Map<number, LNBTree>();

  async function fetchLnbTreeByPath(path: string) {
    const res = await LeftNavigationBarTree({
      locale: locale.value,
      mode: PageTreeMode.Like,
      path: path ?? '',
    });
    const raw = res.pages?.tree || [];

    return raw;
  }

  function convertToTree(flatArr: LNBItem[]): LNBTree[] {
    const result: LNBTree[] = [];

    // Init id map
    flatArr.forEach((i) => {
      itemIdMap.set(i.id, {
        ...i,
        children: [],
      });
    });

    // Build tree
    Array.from(itemIdMap.values()).forEach((node) => {
      const parentId = node.parent;
      // Root
      if (isNil(parentId)) {
        result.push(node);
        return;
      }

      // child
      const parentNode = itemIdMap.get(parentId);
      if (!parentNode) {
      // treat as root
        result.push(node);
      }
      else {
      // push to parent `children`
        parentNode.children?.push(node);
      }
    });

    return result;
  }

  function findRelatedById(id: number) {
    const result: number[] = [];
    const find = (itemId: number) => {
      const item = itemIdMap.get(itemId);
      if (!item) {
        return;
      }

      result.push(itemId);
      if (isNotNil(item.parent)) {
        find(item.parent);
      }
    };

    find(id);
    return result;
  };

  function getItemByPath() {
    return rawLnbList.value.find(i => localePath(`/${i.path}`) === route.path);
  }

  return {
    lnbTree,
    rawLnbList,

    fetchLnbTreeByPath,
    getItemByPath,
    findRelatedById,
    convertToTree,
  };
}
