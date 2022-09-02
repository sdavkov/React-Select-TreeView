import React, { FC, useCallback, useEffect, useReducer } from "react";
import { SelectTreeViewItem } from "../types";
import { setParent } from "../utils/treeNode";

type TState = {
	treeViewItems: SelectTreeViewItem[];
}

enum TreeViewAction {
	expand,
	collapse,
	select,
	deselect,
	setParents,
}

type TActionCreator = {
	type: TreeViewAction,
	payload: string
}

const expandAction = (value: string): TActionCreator => ({
	type: TreeViewAction.expand,
	payload: value,
})

const collapseAction = (value: string): TActionCreator => ({
	type: TreeViewAction.collapse,
	payload: value,
})

const selectAction = (value: string): TActionCreator => ({
	type: TreeViewAction.select,
	payload: value,
})

const deselectAction = (value: string): TActionCreator => ({
	type: TreeViewAction.deselect,
	payload: value,
})

const setParentsAction = (): TActionCreator => ({
	type: TreeViewAction.setParents,
	payload: '',
})

function treeViewReducer(state: TState, { type, payload }: TActionCreator) {
	switch (type) {
		case TreeViewAction.collapse:
			return state;
		case TreeViewAction.expand:
			return state;
		case TreeViewAction.select:
			return state;
		case TreeViewAction.deselect:
			return state;
		case TreeViewAction.setParents:
			return {
				...state,
				treeViewItems: setParent(state.treeViewItems),
			}
		default:
			return state;
	}
}

const initialState: TState = {
	treeViewItems: []
}

type TActions = {
	onExpandTreeNode: (value: string) => void;
	onCollapseTreeNode: (value: string) => void;
	onSelectTreeNode: (value: string) => void;
	onDeselectTreeNode: (value: string) => void;
};

export const SelectTreeViewContext = React.createContext<TState & TActions>(
	{
		...initialState,
		onExpandTreeNode: () => null,
		onCollapseTreeNode: () => null,
		onSelectTreeNode: () => null,
		onDeselectTreeNode: () => null,
	});

type Props = {
	children?: React.ReactNode;
	items: SelectTreeViewItem[];
};

export const SelectTreeViewProvider: FC<Props> = ({ items, children }) => {
	const [state, dispatch] = useReducer(treeViewReducer, { treeViewItems: items })

	const onExpandTreeNode = useCallback((value: string) => {
		dispatch(expandAction(value));
	}, [dispatch]);

	const onCollapseTreeNode = useCallback((value: string) => {
		dispatch(collapseAction(value));
	},
		[dispatch]);

	const onSelectTreeNode = useCallback((value: string) => {
		dispatch(selectAction(value));
	},
		[dispatch]);

	const onDeselectTreeNode = useCallback((value: string) => {
		dispatch(deselectAction(value));
	},
		[dispatch]);

	useEffect(() => {
		dispatch(setParentsAction())
	}, [dispatch])

	const selectTreeViewMethods = { onExpandTreeNode, onCollapseTreeNode, onSelectTreeNode, onDeselectTreeNode };

	const value = { ...state, ...selectTreeViewMethods };

	return (
		<SelectTreeViewContext.Provider value={value}>
			{children}
		</SelectTreeViewContext.Provider>
	)
}