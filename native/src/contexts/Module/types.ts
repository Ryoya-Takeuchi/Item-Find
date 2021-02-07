export namespace Actions {
	export const INIT = 'INIT';
}

interface ActionInit {
	type : 'INIT'
}

export type ReducerAction = ActionInit;