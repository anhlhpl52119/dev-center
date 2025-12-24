import type { LNBItem, LNBTree } from './type.d';

export type * from './type.d';
const localePath = useLocalePath();
export function convertToTree(
  models: LNBItem[],
): LNBTree[] {
  // Create a map for quick lookup by id
  const map = new Map<number, LNBTree>();
  const result: LNBTree[] = [];

  // First pass: Create Tree nodes from Model objects
  models.forEach((model) => {
    const node: LNBTree = {
      ...model,
      children: [],
    };
    map.set(model.id, node);
  });

  // Second pass: Build the tree structure
  models.forEach((model) => {
    const node = map.get(model.id);
    if (!node)
      return;

    if (model.parent === null || model.parent === undefined) {
      // Root level nodes
      result.push(node);
    }
    else {
      // Child nodes - add to parent's children
      const parentNode = map.get(model.parent);
      if (parentNode) {
        if (!parentNode.children) {
          parentNode.children = [];
        }
        parentNode.children.push(node);
      }
      else {
        // If parent not found, treat as root
        result.push(node);
      }
    }
  });

  // Clean up empty children arrays (optional)
  const cleanEmptyChildren = (node: LNBTree) => {
    if (node.children && node.children.length === 0) {
      delete node.children;
    }
    else if (node.children) {
      node.children.forEach(cleanEmptyChildren);
    }
  };

  result.forEach(cleanEmptyChildren);

  return result;
}

export function findParent(nodes: LNBTree[], id: number): number[] {
  // TODO: refactor
  const flattenTree = (nodes: LNBTree[]): LNBTree[] => {
    const flatArray: LNBTree[] = [];

    nodes.forEach((node) => {
      flatArray.push(node);
      if (node.children && node.children.length > 0) {
        flatArray.push(...flattenTree(node.children));
      }
    });

    return flatArray;
  };
  const flats = flattenTree(nodes);
  const rs: number[] = [];
  const loopFn = (loopId: number) => {
    for (const i of flats) {
      if (i.id !== loopId) {
        continue;
      }
      if (!i.parent) {
        return;
      }
      rs.push(i.parent);
      loopFn(i.parent);
    }
  };
  loopFn(id);
  return rs;
}

export function getIdByPath(items: LNBTree[], path: string): number | null {
  for (const i of items) {
    if (localePath(`/${i.path}`) === decodeURIComponent(path)) {
      return i.id;
    }
    if (i.children?.length) {
      const childId = getIdByPath(i.children, path);
      if (childId) {
        return childId;
      }
    }
  }
  return null;
}
