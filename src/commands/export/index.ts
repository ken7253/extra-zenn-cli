import { safeParse } from 'valibot';

import { argNormalizer } from '../../util/argNormalizer';
import type { Command } from '../types';
import { ArgSchema } from './schema';

/**
 * 記事のデータなどを静的なファイルに変換して出力する関数
 * @returns
 */
export const exportFile: Command = async (args: unknown) => {
	const validArgResult = safeParse(ArgSchema, argNormalizer(args));

	if (!validArgResult.success) {
		console.log('args parse error');
		throw validArgResult.error;
	}

	const options = validArgResult.data;
	// export command
	return new Promise(() => JSON.stringify(options));
};
