export type SuccessResult = {
	type: 'success';
	message: string;
};
export type ErrorResult = {
	type: 'error';
	error: Error;
};

type TaskResult = SuccessResult | ErrorResult;

export type Task<T extends Record<string, unknown> | undefined = undefined> =
	T extends undefined ? () => TaskResult : (args: T) => TaskResult;
