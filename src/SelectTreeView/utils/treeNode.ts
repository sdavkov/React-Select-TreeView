import { SelectTreeViewItem } from "../types";

export function selectParents(item: SelectTreeViewItem) {
	let parent = item.parent;
	while (parent) {
		parent.selected = true;
		parent = parent.parent;
	}
}

export function deselectParents(item: SelectTreeViewItem) {
	let parent = item.parent;
	while (parent) {
		parent.selected = false;
		parent = parent.parent;
	}
}

export function selectChildren(items: SelectTreeViewItem[]) {
	items.forEach(item => {
		item.selected = true;
		item.children && selectChildren(item.children);
	});
}

export function deselectChildren(items: SelectTreeViewItem[]) {
	items.forEach(item => {
		item.selected = false;
		item.children && deselectChildren(item.children);
	});
}

export function checkSelectedNeighbours(item: SelectTreeViewItem) {
	if (!item.parent || !item.parent.children) return false;
	const neighbours = item.parent.children.filter(nb => nb.value !== item.value);
	if (neighbours.length === 0) return false;
	for (let i = 0; i < neighbours.length; i++) {
		if (neighbours[i].selected) return true;
	}
	return false;
}

export function setParent(items: SelectTreeViewItem[], parent: SelectTreeViewItem | undefined = undefined) {
	items.forEach(item => {
		if (parent)
			item.parent = parent;
		if (item.children) {
			setParent(item.children, item)
		}
	});
	return items;
}

export function findTreeNode(
    items: SelectTreeViewItem[] | undefined,
    value: string, lavel: number,
    currentlavel: number = 0
  ): SelectTreeViewItem | undefined {
    if (!items)
      return undefined;
    if (currentlavel === lavel) {
      return items.find(item => item.value === value);
    } else {
      for (let i = 0; i < items.length; i++) {
        const findedItem = findTreeNode(items[i].children, value, lavel, currentlavel + 1);
        if (findedItem) {
          return findedItem;
        }
      }
    }
    return undefined;
  }