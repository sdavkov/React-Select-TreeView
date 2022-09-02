import { SelectTreeViewItem } from "../types";
import { checkSelectedNeighbours, deselectChildren, deselectParents, findTreeNode, selectChildren, selectParents, setParent } from "../utils/treeNode";

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

export enum Types {
	Expand = 'EXPAND',
	Collapse = 'COLLAPSE',
	Select = 'SELECT',
	Deselect = 'DESELECT',
	SetParents = 'SETPARENTS',
}

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
	[Types.SetParents]: undefined
}

export const expandActionCreator = (payload: { value: string, lavel: number }) => ({
	type: Types.Expand,
	payload,
})

export const collapseActionCreator = (payload: { value: string, lavel: number }) => ({
	type: Types.Collapse,
	payload,
})

export const selectActionCreator = (payload: { value: string, lavel: number }) => ({
	type: Types.Select,
	payload,
})

export const deselectActionCreator = (payload: { value: string, lavel: number }) => ({
	type: Types.Deselect,
	payload,
})

export type SelectTreeViewActions = ActionMap<SelectTreeViewPayload>[keyof ActionMap<SelectTreeViewPayload>]

export function treeViewReducer(state: SelectTreeViewItem[], action: SelectTreeViewActions) {
	switch (action.type) {
		case Types.Collapse:
			const collapsedItem = findTreeNode(state, action.payload.value, action.payload.lavel);
			if (collapsedItem) {
				collapsedItem.expanded = false;
			}
			return [...state];
		case Types.Expand:
			const expandedItem = findTreeNode(state, action.payload.value, action.payload.lavel);
			if (expandedItem) {
				expandedItem.expanded = true;
			}
			return [...state];
		case Types.Select:
			console.log('select')	
			const selectedItem = findTreeNode(state, action.payload.value, action.payload.lavel);
			if (selectedItem) {
				selectedItem.selected = true;
				selectParents(selectedItem);
				selectedItem.children && selectChildren(selectedItem.children);
			}
			return [...state];
		case Types.Deselect:
		console.log('deselect')	
		const deselectedItem = findTreeNode(state, action.payload.value, action.payload.lavel);
			if (deselectedItem) {
				deselectedItem.selected = false;
				deselectedItem.children && deselectChildren(deselectedItem.children);
				!checkSelectedNeighbours(deselectedItem) && deselectParents(deselectedItem);
			}
			return [...state];
		case Types.SetParents:
			return [...setParent(state)]
		default:
			return state;
	}
}