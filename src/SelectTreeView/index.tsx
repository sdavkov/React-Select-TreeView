import React, { FC } from 'react'
import { SelectTreeViewProvider } from './context/context';
import TreeView from './TreeView/TreeView'
import { SelectTreeViewItem } from './types';

type Props = {
	placeholder: string;
	items: SelectTreeViewItem[];
	multiselect?: boolean;
	onSelected?: (items: SelectTreeViewItem[]) => void;
}

const SelectTreeView: FC<Props> = ({ placeholder, items, multiselect = false }) => {
	return (
		<SelectTreeViewProvider items={items} multiselect={multiselect}>
			<TreeView placeholder={placeholder} />
		</SelectTreeViewProvider>
	)
}

export default SelectTreeView