import React, { createContext, FC, useCallback, useEffect, useReducer } from "react";
import { SelectedTreeViewItem, TreeViewItem } from "../types";
import { State, treeViewReducer, Types } from "./reducer";

const initialState: State = {
	treeViewItems: [],
	selectedTreeViewItems: [],
	multiselect: false,
	isOpen: false,
}

type TActions = {
	onExpandTreeNode: (payload: { value: string, level: number }) => void;
	onCollapseTreeNode: (payload: { value: string, level: number }) => void;
	onSelectTreeNode: (payload: { value: string, level: number }) => void;
	onDeselectTreeNode: (payload: { value: string, level: number }) => void;
	setIsOpen: (payload: boolean) => void;
	clearSelectedTreeViewItems: () => void;
	onChangeSelected?: (items: SelectedTreeViewItem[]) => void;
	collapseAllTreeNodes: () => void;
	expandAllTreeNodes: () => void;
	setTreeNodeItems: (payload: TreeViewItem[]) => void;
};

export const SelectTreeViewContext = createContext<State & TActions>({
	...initialState,
	onExpandTreeNode: (payload: { value: string, level: number }) => null,
	onCollapseTreeNode: (payload: { value: string, level: number }) => null,
	onSelectTreeNode: (payload: { value: string, level: number }) => null,
	onDeselectTreeNode: (payload: { value: string, level: number }) => null,
	setIsOpen: (payload: boolean) => null,
	clearSelectedTreeViewItems: () => null,
	onChangeSelected: (items: SelectedTreeViewItem[]) => null,
	collapseAllTreeNodes: () => null,
	expandAllTreeNodes: () => null,
	setTreeNodeItems: (payload: TreeViewItem[]) => null,
});

type Props = {
	children?: React.ReactNode;
	items: TreeViewItem[];
	multiselect?: boolean;
	value?: SelectedTreeViewItem[];
	onChangeSelected?: (items: SelectedTreeViewItem[]) => void;
};

export const SelectTreeViewProvider: FC<Props> = ({ items, children, multiselect = false, onChangeSelected, value }) => {

	const [state, dispatch] = useReducer(treeViewReducer, { treeViewItems: items, multiselect, selectedTreeViewItems: [], isOpen: false })

	const onExpandTreeNode = useCallback((payload: { value: string, level: number }) => {
		dispatch({ type: Types.Expand, payload });
	}, [dispatch]);

	const onCollapseTreeNode = useCallback((payload: { value: string, level: number }) => {
		dispatch({ type: Types.Collapse, payload });
	},
		[dispatch]);

	const onSelectTreeNode = useCallback((payload: { value: string, level: number }) => {
		dispatch({ type: Types.Select, payload });
	},
		[dispatch]);

	const onDeselectTreeNode = useCallback((payload: { value: string, level: number }) => {
		dispatch({ type: Types.Deselect, payload });
	},
		[dispatch]);

	const setIsOpen = useCallback((payload: boolean) => {
		dispatch({ type: Types.SetIsOpen, payload });
	},
		[dispatch]);

	const clearSelectedTreeViewItems = useCallback(() => {
		dispatch({ type: Types.ClearSelectedItems });
	},
		[dispatch]);

	const collapseAllTreeNodes = useCallback(() => {
		dispatch({ type: Types.CollapseAll });
	},
		[dispatch]);

	const expandAllTreeNodes = useCallback(() => {
		dispatch({ type: Types.ExpandAll });
	},
		[dispatch]);

	const setTreeNodeItems = useCallback((payload: TreeViewItem[]) => {
		dispatch({ type: Types.SetItems, payload });
	},
		[dispatch]);

	useEffect(() => {
		setTreeNodeItems(items);
		value && value.forEach(val => onSelectTreeNode(val));
		dispatch({ type: Types.SetParents })
	}, [items, value, setTreeNodeItems, dispatch, onSelectTreeNode])

	useEffect(() => {
		dispatch({ type: Types.SetMultiselect, payload: multiselect })
	}, [dispatch, multiselect]);

	useEffect(() => {
		onChangeSelected && onChangeSelected(state.selectedTreeViewItems)
	}, [state.selectedTreeViewItems, onChangeSelected]);

	const selectTreeViewMethods = {
		onExpandTreeNode,
		onCollapseTreeNode,
		onSelectTreeNode,
		onDeselectTreeNode,
		setIsOpen,
		clearSelectedTreeViewItems,
		onChangeSelected,
		collapseAllTreeNodes,
		expandAllTreeNodes,
		setTreeNodeItems
	};

	const contextValues = { ...state, ...selectTreeViewMethods };

	return (
		<SelectTreeViewContext.Provider value={contextValues}>
			{children}
		</SelectTreeViewContext.Provider>
	)
}