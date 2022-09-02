import React, { FC, useEffect } from 'react'
import { SelectTreeViewProvider } from './context/SelectTreeViewContext';
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