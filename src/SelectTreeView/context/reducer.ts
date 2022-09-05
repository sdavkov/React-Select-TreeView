import { SelectedTreeViewItem, TreeViewItem } from "../types";
import { allDeselect, checkSelectedNeighbours, collapseAll, deselectChildren, deselectParents, expandAll, expandAllChildren, findTreeNode, getAllSelectedBrances, getAllSelectedLeafs, getLeafsCount, selectChildren, selectParents, setParent } from "../utils/treeNode";

export enum Types {
	SetItems = 'SETITEMS',
	Expand = 'EXPAND',
	Collapse = 'COLLAPSE',
	Select = 'SELECT',
	Deselect = 'DESELECT',
	SetParents = 'SETPARENTS',
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
		lavel: number;
	};
	[Types.Expand]: {
		value: string;
		lavel: number;
	};
	[Types.Select]: {
		value: string;
		lavel: number;
	};
	[Types.Deselect]: {
		value: string;
		lavel: number;
	};
	[Types.SetMultiselect]: boolean;
	[Types.SetIsOpen]: boolean;
	[Types.SetParents]: undefined;
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
			state.treeViewItems = action.payload;
			state.selectedTreeViewItems = [];
			return { ...state };
		case Types.Collapse:
			const collapsedItem = findTreeNode(state.treeViewItems, action.payload.value, action.payload.lavel);
			if (collapsedItem) {
				collapsedItem.expanded = false;
			}
			return { ...state };
		case Types.CollapseAll:
			collapseAll(state.treeViewItems);
			return { ...state }
		case Types.Expand:
			const expandedItem = findTreeNode(state.treeViewItems, action.payload.value, action.payload.lavel);
			if (expandedItem) {
				expandedItem.expanded = true;
			}
			return { ...state };
		case Types.ExpandAll:
			expandAll(state.treeViewItems);
			return { ...state }
		case Types.Select:
			const selectedItem = findTreeNode(state.treeViewItems, action.payload.value, action.payload.lavel);
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
				state.selectedTreeViewItems = getAllSelectedBrances(state.treeViewItems);
			}
			return { ...state };
		case Types.Deselect:
			const deselectedItem = findTreeNode(state.treeViewItems, action.payload.value, action.payload.lavel);
			if (deselectedItem) {
				deselectedItem.selected = false;
				deselectedItem.children && deselectChildren(deselectedItem.children);
				!checkSelectedNeighbours(deselectedItem) && deselectParents(deselectedItem);
				state.selectedTreeViewItems = getAllSelectedBrances(state.treeViewItems);
			}
			return { ...state };
		case Types.SetParents:
			setParent(state.treeViewItems)
			return { ...state }
		case Types.SetMultiselect:
			state.multiselect = action.payload;
			const selectedLeafs = getAllSelectedLeafs(state.treeViewItems);
			if (!state.multiselect && selectedLeafs.length > 0) {
				allDeselect(state.treeViewItems);
				if (selectedLeafs[0].lavel) {
					const item = findTreeNode(state.treeViewItems, selectedLeafs[0].value, selectedLeafs[0].lavel);
					if (item) {
						item.selected = true;
						selectParents(item);
					}
				}
				state.selectedTreeViewItems = getAllSelectedBrances(state.treeViewItems);
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