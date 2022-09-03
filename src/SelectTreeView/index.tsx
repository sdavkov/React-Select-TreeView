import React, { FC } from 'react'
import { SelectTreeViewProvider } from './context/context';
import TreeView from './TreeView/TreeView'
import { SelectTreeViewItem } from './types';

type Props = {
	placeholder: string;
	items: SelectTreeViewItem[];
	multiselect?: boolean;
	onChangeSelected?: (items: SelectTreeViewItem[]) => void;
}

const SelectTreeView: FC<Props> = ({ placeholder, items, multiselect = false, onChangeSelected }) => {
	return (
		<SelectTreeViewProvider items={items} multiselect={multiselect} onChangeSelected={onChangeSelected}>
			<TreeView placeholder={placeholder} />
		</SelectTreeViewProvider>
	)
}

export default SelectTreeView