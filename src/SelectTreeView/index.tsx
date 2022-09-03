import React, { FC } from 'react'
import { SelectTreeViewProvider } from './context/context';
import TreeView from './TreeView/TreeView'
import { TreeViewItem } from './types';

type Props = {
	placeholder: string;
	items: TreeViewItem[];
	multiselect?: boolean;
	onChangeSelected?: (items: TreeViewItem[]) => void;
}

const SelectTreeView: FC<Props> = ({ placeholder, items, multiselect = false, onChangeSelected }) => {
	return (
		<SelectTreeViewProvider items={items} multiselect={multiselect} onChangeSelected={onChangeSelected}>
			<TreeView placeholder={placeholder} />
		</SelectTreeViewProvider>
	)
}

export default SelectTreeView