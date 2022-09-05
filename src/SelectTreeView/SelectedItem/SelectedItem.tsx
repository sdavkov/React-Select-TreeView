import React, { FC, useCallback } from 'react'
import { SelectTreeViewContext } from '../context/context';
import { SelectedTreeViewItem } from '../types'
import styles from './SelectedItem.module.scss'

type Props = {
	item: SelectedTreeViewItem;
}

const SelectedItem: FC<Props> = ({ item }) => {

	const {onDeselectTreeNode} = React.useContext(SelectTreeViewContext);

	const deselectItem = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();
		onDeselectTreeNode(item);
	}, [item, onDeselectTreeNode])

	return (
		<div className={styles.selectedItem}>{item.label}<span onClick={deselectItem}>X</span></div>
	)
}

export default SelectedItem