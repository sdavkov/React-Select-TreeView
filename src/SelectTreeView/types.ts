export type TreeViewItem = {
	label: string;
	value: string;
	lavel?: number;
	selected?: boolean;
	expanded?: boolean;
	parent?: TreeViewItem;
	children?: TreeViewItem[];
}

export type SelectedTreeViewItem = {
	label: string;
	value: string;
	children?: TreeViewItem[];
}