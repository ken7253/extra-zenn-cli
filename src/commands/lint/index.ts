import path from 'node:path';
import { readFile } from 'node:fs/promises';

import { glob } from 'glob';
import fm from 'front-matter';
import { validateArticle } from 'zenn-model';

import type { Command } from '../types';
import { formatter } from './formatter';

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

	const format = result.flatMap((v) => formatter(v));

	// Lint
	return format.join('\n');
};
