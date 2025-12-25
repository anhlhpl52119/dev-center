import type { LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem } from '@@/graphql';

export interface LNBTree extends LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem {
  children: LNBTree[];
}

export interface LNBItem extends LeftNavigationBarTreeQuery_pages_PageQuery_tree_PageTreeItem {};
