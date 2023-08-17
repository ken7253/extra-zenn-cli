import { safeParse } from 'valibot';

import { argNormalizer } from '../../util/argNormalizer';
import { ArgSchema } from './schema';

export const list = (args: unknown): void => {
	const validArgs = safeParse(ArgSchema, argNormalizer(args));

	if (validArgs.success) {
		console.log(validArgs.data);
	}
};
