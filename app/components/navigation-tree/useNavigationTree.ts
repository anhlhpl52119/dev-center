import type { FlattenedNavigationNode, NavigationTreeNodes } from './index';
import { isNil, isNotNil } from 'es-toolkit';
import { PageTreeMode } from '~~/graphql';

export function useNavigationTree() {
  const { LeftNavigationBarTree } = useGraphqlRequest();

  const localePath = useLocalePath();
  const route = useRoute();
  const { locale } = useI18n();

  const flattenedList = ref<FlattenedNavigationNode[]>([]);
  const navTree = computed<NavigationTreeNodes[]>(() =>
    convertToTree(flattenedList.value),
  );
  const nodeIdMap = new Map<number, NavigationTreeNodes>();

  async function fetchLnbTreeByPath(path: string) {
    const res = await LeftNavigationBarTree({
      locale: locale.value,
      mode: PageTreeMode.Like,
      path: path ?? '',
    });

    const flat = res.pages?.tree || [];
    return flat;
  }

  function convertToTree(
    flatArr: FlattenedNavigationNode[],
  ): NavigationTreeNodes[] {
    const result: NavigationTreeNodes[] = [];

    // Init id map
    flatArr.forEach((i) => {
      nodeIdMap.set(i.id, {
        ...i,
        children: [],
      });
    });

    // Build tree
    Array.from(nodeIdMap.values()).forEach((node) => {
      const parentId = node.parent;
      // Root
      const isRootNode = isNil(parentId);
      if (isRootNode) {
        result.push(node);
        return;
      }

      // child
      const parentNode = nodeIdMap.get(parentId);
      if (isNil(parentNode)) {
        // treat as root
        result.push(node);
      }
      else {
        // push to `children` of parent node
        parentNode.children?.push(node);
      }
    });

    return result;
  }

  function findRelatedById(id: number) {
    const result: number[] = [];
    const find = (itemId: number) => {
      const item = nodeIdMap.get(itemId);
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
  }

  function getItemByPath() {
    return flattenedList.value.find(
      i => localePath(`/${i.path}`) === route.path,
    );
  }

  return {
    lnbTree: navTree,
    rawLnbList: flattenedList,

    fetchLnbTreeByPath,
    getItemByPath,
    findRelatedById,
    convertToTree,
  };
}
