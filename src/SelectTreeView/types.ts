export type SelectTreeViewItem = {
	label: string;
	value: string;
	selected?: boolean;
	expanded?: boolean;
	parent?: SelectTreeViewItem;
	children?: SelectTreeViewItem[];
  }