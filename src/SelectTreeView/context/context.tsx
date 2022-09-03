import React, { createContext, FC, useCallback, useEffect, useReducer } from "react";
import { SelectTreeViewItem } from "../types";
import { collapseActionCreator, deselectActionCreator, expandActionCreator, selectActionCreator, treeViewReducer, Types } from "./reducer";

type InitialStateType = {
	treeViewItems: SelectTreeViewItem[];
	multiselect: boolean;
}

const initialState: InitialStateType = {
	treeViewItems: [],
	multiselect: false,
}

type TActions = {
	onExpandTreeNode: (payload: { value: string, lavel: number }) => void;
	onCollapseTreeNode: (payload: { value: string, lavel: number }) => void;
	onSelectTreeNode: (payload: { value: string, lavel: number }) => void;
	onDeselectTreeNode: (payload: { value: string, lavel: number }) => void;
};

export const SelectTreeViewContext = createContext<InitialStateType & TActions>({
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
};

export const SelectTreeViewProvider: FC<Props> = ({ items, children , multiselect = false}) => {

	const [state, dispatch] = useReducer(treeViewReducer, {treeViewItems: items, multiselect})

	const onExpandTreeNode = useCallback((payload: { value: string, lavel: number }) => {
		dispatch(expandActionCreator(payload));
	}, [dispatch]);

	const onCollapseTreeNode = useCallback((payload: { value: string, lavel: number }) => {
		dispatch(collapseActionCreator(payload));
	},
		[dispatch]);

	const onSelectTreeNode = useCallback((payload: { value: string, lavel: number }) => {
		dispatch(selectActionCreator(payload));
	},
		[dispatch]);

	const onDeselectTreeNode = useCallback((payload: { value: string, lavel: number }) => {
		dispatch(deselectActionCreator(payload));
	},
		[dispatch]);

	useEffect(() => {
		dispatch({ type: Types.SetParents })
	}, [dispatch])

	const selectTreeViewMethods = { onExpandTreeNode, onCollapseTreeNode, onSelectTreeNode, onDeselectTreeNode };

	const value = { ...state, ...selectTreeViewMethods };

	return (
		<SelectTreeViewContext.Provider value={value}>
			{children}
		</SelectTreeViewContext.Provider>
	)
}