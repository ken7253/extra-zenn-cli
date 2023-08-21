import path from 'node:path';
import { readFile, mkdir, writeFile } from 'node:fs/promises';

import { safeParse } from 'valibot';
import { glob } from 'glob';
import markdownToHtml from 'zenn-markdown-html';

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
	const inputFileList = await glob(
		path.join(process.cwd(), 'articles', '**.md'),
	);

	const parser = markdownToHtml;
	const catTask = inputFileList.map((filePath) =>
		readFile(filePath, { encoding: 'utf-8' }),
	);
	const result = (await Promise.allSettled(catTask)).map((file) => {
		if (file.status === 'fulfilled') {
			const html = parser(file.value);
			return html;
		} else {
			return `<p>file parse error</p>`;
		}
	});

	const outputDirectory = path.join(process.cwd(), options.output);
	await mkdir(outputDirectory);
	const writeTask = result.map((file, index) => {
		return writeFile(path.join(outputDirectory, `file-${index}.html`), file);
	});
	void Promise.allSettled(writeTask);

	// export command
	return JSON.stringify(result);
};
