import React, { FC, useContext } from 'react'
import { SelectTreeViewItem } from '../types'
import Toggle from '../Toggle/Toggle';
import styles from './TreeNode.module.scss'
import { SelectTreeViewContext } from '../context/context';

type Props = {
	node: SelectTreeViewItem;
}

const TreeNode: FC<Props> = ({ node }) => {

	const { onExpandTreeNode, onCollapseTreeNode, onSelectTreeNode, onDeselectTreeNode } = useContext(SelectTreeViewContext);

	function onNodeToggle(checked: boolean) {
		if (checked)
			onCollapseTreeNode({ value: node.value, lavel: node.lavel! })
		else
			onExpandTreeNode({ value: node.value, lavel: node.lavel! })
	}

	function changeSelection() {
		node.selected ? onDeselectTreeNode({ value: node.value, lavel: node.lavel! }) : onSelectTreeNode({ value: node.value, lavel: node.lavel! });
	}

	function onNodeClick() {
		if (isLeaf) {
			changeSelection();
		} else {
			onNodeToggle(!!node.expanded);
		}
	}

	const childrenCx = [styles.children, !node.children && styles.hidden, !node.expanded && styles.hidden].filter(Boolean).join(' ')
	const isLeaf = !node.children || node.children.length === 0;

	return (
		<li className={styles.node}>
			<div className={styles.row}>
				<Toggle onToggle={onNodeToggle} expanded={Boolean(node.expanded)} isLeaf={isLeaf}></Toggle>
				<input onChange={changeSelection} className={styles.checkbox} type='checkbox' checked={Boolean(node.selected)} />
				<div onClick={onNodeClick} className={styles.title}>{node.label}</div>
			</div>
			<div className={childrenCx}>
				<ul>
					{node.children && node.children.map(item => (
						<TreeNode key={item.value} node={item} />
					))}
				</ul>
			</div>
		</li>
	)
}

export default TreeNode