import React, { FC, useCallback, useMemo } from 'react'
import { SelectTreeViewContext } from '../context/context';
import { SelectedTreeViewItem } from '../types'
import styles from './SelectedItem.module.scss'

type Props = {
	item: SelectedTreeViewItem;
}

const SelectedItem: FC<Props> = ({ item }) => {

	const {onDeselectTreeNode} = React.useContext(SelectTreeViewContext);

	const label = useMemo(() => {
		const names = [item.label];
		let children = item.children;
		while(children && children.length > 0) {
			names.push(children[0].label);
			children = children[0].children;
		}
		return names.reverse().join(' > ');
	}, [item])

	const deselectItem = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();
		let value = item.value;
		let lavel = 0;
		let children = item.children;
		while(children && children.length > 0) {
			value = children[0].value;
			lavel++;
			children = children[0].children;
		}
		onDeselectTreeNode({value, lavel});
	}, [item, onDeselectTreeNode])

	return (
		<div className={styles.selectedItem}>{label}<span onClick={deselectItem}>X</span></div>
	)
}

export default SelectedItem