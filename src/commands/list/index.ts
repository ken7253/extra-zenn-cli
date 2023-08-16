import type { Task } from '../types';

export const list: Task = () => {
	return {
		type: 'success',
		message: 'show list',
	};
};
