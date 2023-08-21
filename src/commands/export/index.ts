import { safeParse } from 'valibot';

import { argNormalizer } from '../../util/argNormalizer';
import type { Command } from '../types';
import { ArgSchema } from './schema';

/**
 * 記事データなどを静的ファイルとして出力する関数
 *
 * @param args `cac`から渡される引数
 *
 * @returns 標準出力に表示する処理結果
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
