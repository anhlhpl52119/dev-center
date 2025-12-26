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
  const expandedIds = useState<Set<number>>('nav-tree-expanded-ids', () => new Set());

  function toggleExpand(id: number) {
    if (expandedIds.value.has(id)) {
      expandedIds.value.delete(id);
    } else {
      expandedIds.value.add(id);
    }
  }

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
      } else {
        // push to `children` of parent node
        parentNode.children?.push(node);
      }
    });

    return result;
  }

  function findRelatedById(id: number, source?: FlattenedNavigationNode[]) {
    const result: number[] = [];
    let getItem: (id: number) => FlattenedNavigationNode | NavigationTreeNodes | undefined;

    if (source) {
      const map = new Map(source.map(i => [i.id, i]));
      getItem = (itemId: number) => map.get(itemId);
    } else {
      getItem = (itemId: number) => nodeIdMap.get(itemId);
    }

    const find = (itemId: number) => {
      const item = getItem(itemId);
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

  function getItemByPath(source?: FlattenedNavigationNode[]) {
    const list = source ?? flattenedList.value;
    return list.find(
      i => localePath(`/${i.path}`) === route.path,
    );
  }

  return {
    lnbTree: navTree,
    rawLnbList: flattenedList,
    expandedIds: reactive(expandedIds),

    toggleExpand,
    fetchLnbTreeByPath,
    getItemByPath,
    findRelatedById,
    convertToTree,
  };
}
