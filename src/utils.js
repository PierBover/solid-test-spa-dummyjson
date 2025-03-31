// util for binding a signal to an input
export function bindInput (get, set) {
	return {
		value: get(),
		onInput: (e) => set(e.target.value)
	};
}

export class NotAuthentincatedError extends Error {
	constructor() {
		super("NotAuthentincatedError");
		this.name = "NotAuthentincatedError";
	}
}