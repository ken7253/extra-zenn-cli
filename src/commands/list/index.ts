import type { Task } from '../../types';
import { type ArgData } from './schema';

export const list: Task<ArgData> = (args) => {
	return {
		type: 'success',
		message: `${JSON.stringify(args)}`,
	};
};
