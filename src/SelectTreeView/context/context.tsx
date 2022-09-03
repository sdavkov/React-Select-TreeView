import React, { createContext, FC, useCallback, useEffect, useReducer } from "react";
import { SelectTreeViewItem } from "../types";
import { State, treeViewReducer, Types } from "./reducer";

const initialState: State = {
	treeViewItems: [],
	selectedTreeViewItems: [],
	multiselect: false,
	onChangeSelected: (items: SelectTreeViewItem[]) => null,
}

type TActions = {
	onExpandTreeNode: (payload: { value: string, lavel: number }) => void;
	onCollapseTreeNode: (payload: { value: string, lavel: number }) => void;
	onSelectTreeNode: (payload: { value: string, lavel: number }) => void;
	onDeselectTreeNode: (payload: { value: string, lavel: number }) => void;
};

export const SelectTreeViewContext = createContext<State & TActions>({
	...initialState,
	onExpandTreeNode: (payload: { value: string, lavel: number }) => null,
	onCollapseTreeNode: (payload: { value: string, lavel: number }) => null,
	onSelectTreeNode: (payload: { value: string, lavel: number }) => null,
	onDeselectTreeNode: (payload: { value: string, lavel: number }) => null
});

type Props = {
	children?: React.ReactNode;
	items: SelectTreeViewItem[];
	multiselect?: boolean;
	onChangeSelected?: (items: SelectTreeViewItem[]) => void;
};

export const SelectTreeViewProvider: FC<Props> = ({ items, children , multiselect = false, onChangeSelected}) => {

	const [state, dispatch] = useReducer(treeViewReducer, {treeViewItems: items, multiselect, onChangeSelected, selectedTreeViewItems: [] })

	const onExpandTreeNode = useCallback((payload: { value: string, lavel: number }) => {
		dispatch({type: Types.Expand, payload});
	}, [dispatch]);

	const onCollapseTreeNode = useCallback((payload: { value: string, lavel: number }) => {
		dispatch({type: Types.Collapse, payload});
	},
		[dispatch]);

	const onSelectTreeNode = useCallback((payload: { value: string, lavel: number }) => {
		dispatch({type: Types.Select, payload});
	},
		[dispatch]);

	const onDeselectTreeNode = useCallback((payload: { value: string, lavel: number }) => {
		dispatch({type: Types.Deselect, payload});
	},
		[dispatch]);

	useEffect(() => {
		dispatch({ type: Types.SetParents })
	}, [dispatch])

	useEffect(() => {
		dispatch({ type: Types.SetMultiselect, payload: {value: multiselect} })
	}, [dispatch, multiselect])

	const selectTreeViewMethods = { onExpandTreeNode, onCollapseTreeNode, onSelectTreeNode, onDeselectTreeNode };

	const value = { ...state, ...selectTreeViewMethods };

	return (
		<SelectTreeViewContext.Provider value={value}>
			{children}
		</SelectTreeViewContext.Provider>
	)
}