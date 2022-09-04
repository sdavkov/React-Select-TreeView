import React, { FC, useCallback, useMemo } from 'react'
import { SelectTreeViewContext } from '../context/context';
import { SelectedTreeViewItem } from '../types'
import { getLowLavelValue, getSelectedItemLabel } from '../utils/treeNode';
import styles from './SelectedItem.module.scss'

type Props = {
	item: SelectedTreeViewItem;
}

const SelectedItem: FC<Props> = ({ item }) => {

	const {onDeselectTreeNode} = React.useContext(SelectTreeViewContext);

	const label = useMemo(() => {
		return getSelectedItemLabel(item);
	}, [item])

	const deselectItem = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();
		onDeselectTreeNode(getLowLavelValue(item));
	}, [item, onDeselectTreeNode])

	return (
		<div className={styles.selectedItem}>{label}<span onClick={deselectItem}>X</span></div>
	)
}

export default SelectedItem