export type TreeViewItem = {
	label: string;
	value: string;
	level?: number;
	selected?: boolean;
	expanded?: boolean;
	parent?: TreeViewItem;
	children?: TreeViewItem[];
}

export type SelectedTreeViewItem = {
	label: string;
	value: string;
	level: number;
}