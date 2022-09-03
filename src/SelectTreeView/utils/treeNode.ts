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

export function setParent(items: TreeViewItem[], parent: TreeViewItem | undefined = undefined, lavel: number = 0) {
	items.forEach(item => {
		if (parent)
			item.parent = parent;
		item.lavel = lavel;
		if (item.children) {
			setParent(item.children, item, lavel + 1)
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

export function getAllSelectedLeafs(items: TreeViewItem[], selectedLeafs: TreeViewItem[] = []) {
	items.forEach(item => {
		if ((!item.children || item.children.length === 0) && item.selected)
			selectedLeafs.push({ ...item });
		else if (item.children) {
			getAllSelectedLeafs(item.children, selectedLeafs)
		}
	})
	return selectedLeafs;
}

function convertToSelected(items: TreeViewItem[]): SelectedTreeViewItem[] {
	return items.map(item => (
		{
			value: item.value,
			label: item.label,
			children: item.children ? convertToSelected(item.children) : undefined,
		}))
}

export function getAllSelectedBrances(items: TreeViewItem[]) {
	const selectedLeafs = getAllSelectedLeafs(items);
	const allSelectedBranches: TreeViewItem[] = [];
	selectedLeafs.forEach(item => {
		while (item.parent) {
			item = { ...item.parent, children: [item] };
		}
		allSelectedBranches.push(item);

	})
	return convertToSelected(allSelectedBranches);
}

export function findTreeNode(
	items: TreeViewItem[] | undefined,
	value: string,
	lavel: number,
	currentlavel: number = 0
): TreeViewItem | undefined {
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