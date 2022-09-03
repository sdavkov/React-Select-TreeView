export type SelectTreeViewItem = {
	label: string;
	value: string;
	lavel?: number;
	selected?: boolean;
	expanded?: boolean;
	parent?: SelectTreeViewItem;
	children?: SelectTreeViewItem[];
}

export type SelectedTreeViewItem = {
	label: string;
	value: string;
	children?: SelectTreeViewItem[];
}