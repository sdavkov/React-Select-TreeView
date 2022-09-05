import { SelectedTreeViewItem, TreeViewItem } from "../types";

export function selectParents(item: TreeViewItem) {
	let parent = item.parent;
	while (parent) {
		parent.selected = true;
		parent = parent.parent;
	}
}

export function deselectParents(item: TreeViewItem) {
	let parent = item.parent;
	while (parent) {
		parent.selected = false;
		parent = parent.parent;
	}
}

export function selectChildren(items: TreeViewItem[]) {
	items.forEach(item => {
		item.selected = true;
		item.expanded = true;
		item.children && selectChildren(item.children);
	});
}

export function deselectChildren(items: TreeViewItem[]) {
	items.forEach(item => {
		item.selected = false;
		item.children && deselectChildren(item.children);
	});
}

export function expandAllChildren(item: TreeViewItem) {
	item.expanded = true;
	item.children && item.children.forEach(expandAllChildren);
}

export function expandAll(items: TreeViewItem[]) {
	items.forEach(item => {
		item.expanded = true;
		item.children && expandAll(item.children);
	})
}

export function collapseAll(items: TreeViewItem[]) {
	items.forEach(item => {
		item.expanded = false;
		item.children && collapseAll(item.children);
	})
}

export function getLeafsCount(item: TreeViewItem) {
	let count = 0;
	if (item.children) {
		item.children.forEach(child => {
			if (child.children)
				count += getLeafsCount(child);
			else
				count++;
		});
	}
	return count;
}

export function checkSelectedNeighbours(item: TreeViewItem) {
	if (!item.parent || !item.parent.children) return false;
	const neighbours = item.parent.children.filter(nb => nb.value !== item.value);
	if (neighbours.length === 0) return false;
	for (let i = 0; i < neighbours.length; i++) {
		if (neighbours[i].selected) return true;
	}
	return false;
}

export function setParent(items: TreeViewItem[], parent: TreeViewItem | undefined = undefined, level: number = 0) {
	items.forEach(item => {
		if (parent)
			item.parent = parent;
		item.level = level;
		if (item.children) {
			setParent(item.children, item, level + 1)
		}
	});
}

export function allDeselect(items: TreeViewItem[]) {
	items.forEach(item => {
		item.selected = false;
		if (item.children) {
			allDeselect(item.children)
		}
	});
}

export function getAllSelectedLeafs(items: TreeViewItem[], selectedLeafs: SelectedTreeViewItem[] = []) {
	items.forEach(item => {
		if ((!item.children || item.children.length === 0) && item.selected)
			selectedLeafs.push({
				value: item.value,
				label: item.label,
				level: item.level!,
			});
		else if (item.children) {
			getAllSelectedLeafs(item.children, selectedLeafs)
		}
	})
	return selectedLeafs;
}

export function findTreeNode(
	items: TreeViewItem[] | undefined,
	value: string,
	level: number,
	currentlevel: number = 0
): TreeViewItem | undefined {
	if (!items)
		return undefined;
	if (currentlevel === level) {
		return items.find(item => item.value === value);
	} else {
		for (let i = 0; i < items.length; i++) {
			const findedItem = findTreeNode(items[i].children, value, level, currentlevel + 1);
			if (findedItem) {
				return findedItem;
			}
		}
	}
	return undefined;
}