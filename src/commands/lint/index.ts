import path from 'node:path';
import { readFile } from 'node:fs/promises';

import { glob } from 'glob';
import fm from 'front-matter';
import { validateArticle } from 'zenn-model';

import type { Command } from '../types';

export const lint: Command = async () => {
	const baseDir = path.join(process.cwd(), 'articles');
	const fileList = await glob(path.join(baseDir, '*.md'));

	const validate = fileList.map(async (path) => {
		const file = await readFile(path, { encoding: 'utf-8' });
		const { attributes } = fm(file);
		if (attributes == null) return [path, null] as const;
		return [path, validateArticle(attributes)] as const;
	});

	const result = await Promise.all(validate);

	const format = result.flatMap(([path, detail]) => {
		if (detail === null) return [''];

		const error = detail.filter(({ isCritical }) => isCritical);
		const warn = detail.filter(({ isCritical }) => !isCritical);

		const errorList = error
			.map(({ type, message }) => [type, message].join('\n'))
			.join('\n');
		const warnList = error
			.map(({ type, message }) => [type, message].join('\n'))
			.join('\n');

		return [
			`${path}`,
			`Error: ${error.length}`,
			`${errorList}`,
			`Warn: ${warn.length}`,
			`${warnList}`,
		].join('\n');
	});

	// Lint
	return format.join('\n');
};
