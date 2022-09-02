import React, { FC } from 'react'
import { SelectTreeViewProvider } from './context/context';
import TreeView from './TreeView/TreeView'
import { SelectTreeViewItem } from './types';

type Props = {
	placeholder: string;
	items: SelectTreeViewItem[];
	multiSelect?: boolean;
	onSelected?: (items: SelectTreeViewItem[]) => void;
}

const SelectTreeView: FC<Props> = ({ placeholder, items, multiSelect = false }) => {
	return (
		<SelectTreeViewProvider items={items}>
			<TreeView placeholder={placeholder} multiSelect={multiSelect} />
		</SelectTreeViewProvider>
	)
}

export default SelectTreeView