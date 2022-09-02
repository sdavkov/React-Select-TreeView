import React, { FC } from 'react'
import { SelectTreeViewItem } from '../types'
import Toggle from '../Toggle/Toggle';
import styles from './TreeNode.module.scss'
import { checkSelectedNeighbours, deselectChildren, deselectParents, selectChildren, selectParents, setParent, findTreeNode } from './utils/treeNode';

type Props = {
	node: SelectTreeViewItem;
	lavel: number;
}

const TreeNode: FC<Props> = ({ node, lavel }) => {

	function onExpanded(value: string, lavel: number) {
		const expandedItem = findTreeNode(treeViewItems, value, lavel);
		if (expandedItem) {
		  expandedItem.expanded = !expandedItem.expanded;
		  setTreeViewItems([...treeViewItems]);
		}
	  }
	
	  function onSelected(value: string, lavel: number) {
		const item = findTreeNode(treeViewItems, value, lavel);
		if (item) {
		  item.selected = !item.selected;
		  if (item.selected) {
			selectParents(item);
			item.children && selectChildren(item.children);
		  }
		  else {
			item.children && deselectChildren(item.children);
			!checkSelectedNeighbours(item) && deselectParents(item);
		  }
		  setTreeViewItems([...treeViewItems]);
		}
	  }

	function onNodeToggle() {
		onExpanded(node.value, lavel);
	}

	function changeSelection() {
		onSelected(node.value, lavel);
	}

	function onNodeClick() {
		if (isLeaf) {
			changeSelection()
		} else {
			onNodeToggle();
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
						<TreeNode setTreeViewItems={setTreeViewItems} lavel={lavel + 1} onExpanded={onExpanded} onSelected={onSelected} key={item.value} node={item} />
					))}
				</ul>
			</div>
		</li>
	)
}

export default TreeNode