import { SelectedTreeViewItem, TreeViewItem } from "../types";
import { allDeselect, checkSelectedNeighbours, collapseAll, deselectChildren, deselectParents, expandAll, expandAllChildren, findTreeNode, getAllSelectedLeafs, getLeafsCount, selectChildren, selectParents, setParent } from "../utils/treeNode";

export enum Types {
	SetItems = 'SETITEMS',
	Expand = 'EXPAND',
	Collapse = 'COLLAPSE',
	Select = 'SELECT',
	Deselect = 'DESELECT',
	SetMultiselect = 'SETMULTISELECT',
	SetIsOpen = 'SETISOPEN',
	ClearSelectedItems = 'CLEARSELECTEDNITEMS',
	ExpandAll = 'EXPANDALL',
	CollapseAll = 'COLLAPSEALL',
}

type ActionMap<M extends { [index: string]: any }> = {
	[Key in keyof M]: M[Key] extends undefined
	? {
		type: Key;
	}
	: {
		type: Key;
		payload: M[Key];
	}
};

type SelectTreeViewPayload = {
	[Types.Collapse]: {
		value: string;
		level: number;
	};
	[Types.Expand]: {
		value: string;
		level: number;
	};
	[Types.Select]: {
		value: string;
		level: number;
	};
	[Types.Deselect]: {
		value: string;
		level: number;
	};
	[Types.SetMultiselect]: boolean;
	[Types.SetIsOpen]: boolean;
	[Types.ClearSelectedItems]: undefined;
	[Types.ExpandAll]: undefined;
	[Types.CollapseAll]: undefined;
	[Types.SetItems]: TreeViewItem[];
}

export type SelectTreeViewActions = ActionMap<SelectTreeViewPayload>[keyof ActionMap<SelectTreeViewPayload>]

export type State = {
	treeViewItems: TreeViewItem[];
	selectedTreeViewItems: SelectedTreeViewItem[];
	multiselect: boolean;
	isOpen: boolean;
}

export function treeViewReducer(state: State, action: SelectTreeViewActions) {
	switch (action.type) {
		case Types.SetItems:
			state.treeViewItems = setParent(action.payload);
			state.selectedTreeViewItems = [];
			return { ...state };
		case Types.Collapse:
			const collapsedItem = findTreeNode(state.treeViewItems, action.payload.value, action.payload.level);
			if (collapsedItem) {
				collapsedItem.expanded = false;
			}
			return { ...state };
		case Types.CollapseAll:
			collapseAll(state.treeViewItems);
			return { ...state }
		case Types.Expand:
			const expandedItem = findTreeNode(state.treeViewItems, action.payload.value, action.payload.level);
			if (expandedItem) {
				expandedItem.expanded = true;
			}
			return { ...state };
		case Types.ExpandAll:
			expandAll(state.treeViewItems);
			return { ...state }
		case Types.Select:
			const selectedItem = findTreeNode(state.treeViewItems, action.payload.value, action.payload.level);
			if (selectedItem) {
				if (!state.multiselect)
					allDeselect(state.treeViewItems);
				if (!state.multiselect && getLeafsCount(selectedItem) <= 1) {
					selectedItem.selected = true;
					selectedItem.expanded = true;
					selectParents(selectedItem);
					selectedItem.children && selectChildren(selectedItem.children);
				}
				else if (state.multiselect) {
					selectedItem.selected = true;
					selectedItem.expanded = true;
					selectParents(selectedItem);
					selectedItem.children && selectChildren(selectedItem.children);
				}
				else {
					//only expand all children
					expandAllChildren(selectedItem);
				}
				state.selectedTreeViewItems = getAllSelectedLeafs(state.treeViewItems);
			}
			return { ...state };
		case Types.Deselect:
			const deselectedItem = findTreeNode(state.treeViewItems, action.payload.value, action.payload.level);
			if (deselectedItem) {
				deselectedItem.selected = false;
				deselectedItem.children && deselectChildren(deselectedItem.children);
				!checkSelectedNeighbours(deselectedItem) && deselectParents(deselectedItem);
				state.selectedTreeViewItems = getAllSelectedLeafs(state.treeViewItems);
			}
			return { ...state };
		case Types.SetMultiselect:
			state.multiselect = action.payload;
			const selectedLeafs = getAllSelectedLeafs(state.treeViewItems);
			if (!state.multiselect && selectedLeafs.length > 0) {
				allDeselect(state.treeViewItems);
				if (selectedLeafs[0].level) {
					const item = findTreeNode(state.treeViewItems, selectedLeafs[0].value, selectedLeafs[0].level);
					if (item) {
						item.selected = true;
						selectParents(item);
					}
				}
				state.selectedTreeViewItems = getAllSelectedLeafs(state.treeViewItems);
			}
			return { ...state }
		case Types.SetIsOpen:
			return { ...state, isOpen: action.payload }
		case Types.ClearSelectedItems:
			allDeselect(state.treeViewItems);
			return { ...state, selectedTreeViewItems: [] }
		default:
			return state;
	}
}