import React, { FC } from 'react'
import { SelectTreeViewProvider } from './context/context';
import TreeView from './TreeView/TreeView'
import { SelectedTreeViewItem, TreeViewItem } from './types';

type Props = {
	placeholder: string;
	items: TreeViewItem[];
	multiselect?: boolean;
	onChangeSelected?: (items: TreeViewItem[]) => void;
	value?: SelectedTreeViewItem[];
}

const SelectTreeView: FC<Props> = ({ placeholder, items, multiselect = false, onChangeSelected, value }) => {
	return (
		<SelectTreeViewProvider
			items={items}
			multiselect={multiselect}
			onChangeSelected={onChangeSelected}
			value={value}
		>
			<TreeView placeholder={placeholder} />
		</SelectTreeViewProvider>
	)
}

export default SelectTreeView