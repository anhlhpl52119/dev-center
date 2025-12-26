import type { LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem } from '@@/graphql';

export interface NavigationTreeNodes
  extends LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem {
  children: NavigationTreeNodes[];
}

export interface FlattenedNavigationNode
  extends LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem {}
