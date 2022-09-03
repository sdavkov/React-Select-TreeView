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
	onExpandTreeNode: (payload: { value: string, lavel: number }) => void;
	onCollapseTreeNode: (payload: { value: string, lavel: number }) => void;
	onSelectTreeNode: (payload: { value: string, lavel: number }) => void;
	onDeselectTreeNode: (payload: { value: string, lavel: number }) => void;
	setIsOpen: (payload: boolean) => void;
	clearSelectedTreeViewItems: () => void;
	onChangeSelected?: (items: TreeViewItem[]) => void;
};

export const SelectTreeViewContext = createContext<State & TActions>({
	...initialState,
	onExpandTreeNode: (payload: { value: string, lavel: number }) => null,
	onCollapseTreeNode: (payload: { value: string, lavel: number }) => null,
	onSelectTreeNode: (payload: { value: string, lavel: number }) => null,
	onDeselectTreeNode: (payload: { value: string, lavel: number }) => null,
	setIsOpen: (payload: boolean) => null,
	clearSelectedTreeViewItems: () => null,
	onChangeSelected: (items: TreeViewItem[]) => null,
});

type Props = {
	children?: React.ReactNode;
	items: TreeViewItem[];
	multiselect?: boolean;
	onChangeSelected?: (items: SelectedTreeViewItem[]) => void;
};

export const SelectTreeViewProvider: FC<Props> = ({ items, children, multiselect = false, onChangeSelected }) => {

	const [state, dispatch] = useReducer(treeViewReducer, { treeViewItems: items, multiselect, selectedTreeViewItems: [], isOpen: false })

	const onExpandTreeNode = useCallback((payload: { value: string, lavel: number }) => {
		dispatch({ type: Types.Expand, payload });
	}, [dispatch]);

	const onCollapseTreeNode = useCallback((payload: { value: string, lavel: number }) => {
		dispatch({ type: Types.Collapse, payload });
	},
		[dispatch]);

	const onSelectTreeNode = useCallback((payload: { value: string, lavel: number }) => {
		dispatch({ type: Types.Select, payload });
	},
		[dispatch]);

	const onDeselectTreeNode = useCallback((payload: { value: string, lavel: number }) => {
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

	useEffect(() => {
		dispatch({ type: Types.SetParents })
	}, [dispatch])

	useEffect(() => {
		dispatch({ type: Types.SetMultiselect, payload: multiselect })
	}, [dispatch, multiselect])

	useEffect(() => {
		onChangeSelected && onChangeSelected(state.selectedTreeViewItems)
	}, [state.selectedTreeViewItems, onChangeSelected])

	const selectTreeViewMethods = { onExpandTreeNode, onCollapseTreeNode, onSelectTreeNode, onDeselectTreeNode, setIsOpen, clearSelectedTreeViewItems, onChangeSelected };

	const value = { ...state, ...selectTreeViewMethods };

	return (
		<SelectTreeViewContext.Provider value={value}>
			{children}
		</SelectTreeViewContext.Provider>
	)
}