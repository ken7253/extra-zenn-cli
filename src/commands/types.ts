type SuccessResult = {
	type: 'success';
	message: string;
};
type ErrorResult = {
	type: 'error';
	error: Error;
};

type TaskResult = SuccessResult | ErrorResult;

export type Task<T = never> = (args: T) => TaskResult;
