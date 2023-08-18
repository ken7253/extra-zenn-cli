import path from 'node:path';

import { safeParse } from 'valibot';
import { glob } from 'glob';

import { argNormalizer } from '../../util/argNormalizer';
import type { Command } from '../types';
import { ArgSchema } from './schema';

/**
 * list command
 * @param args `cac`によって処理される引数のオブジェクト
 */
export const list: Command = async (args) => {
	const validResult = safeParse(ArgSchema, argNormalizer(args));

	if (!validResult.success) {
		console.log('augment parse error');
		throw validResult.error;
	}

	const option = validResult.data;
	const baseDir = path.join(process.cwd(), option.books ? 'books' : 'articles');
	const filePathList = await glob(path.join(baseDir, '*.md'));
	const fileList = filePathList.reduce<string[]>((acc, current) => {
		const { name, ext } = path.parse(current);
		return [...acc, `${name}${ext}`];
	}, []);

	return fileList.join(' ');
};
