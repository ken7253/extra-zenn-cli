import type { Task } from '../types';

type TaskResult = ReturnType<Task>;

export const logger = (result: TaskResult) => {
	if (result.type === 'error') {
		console.error(result.error);
	} else {
		console.log(result.message);
	}
};
