import path from 'node:path';
import { readFile } from 'node:fs/promises';

import { glob } from 'glob';
import fm from 'front-matter';
import { validateArticle } from 'zenn-model';

import type { Command } from '../types';

export const lint: Command = async () => {
	const baseDir = path.join(process.cwd(), 'articles');
	const fileList = await glob(path.join(baseDir, '*.md'));
	const fileData = fileList.map((filePath) =>
		readFile(filePath, { encoding: 'utf-8' }),
	);
	const frontMatter = (await Promise.all(fileData)).map((file) => fm(file));

	const attributesList = frontMatter
		.filter((v) => Object.hasOwn(v, 'attributes'))
		.map((v) => v.attributes);
	const r = attributesList.map((attr) => {
		if (!(attr instanceof Object)) return;
		return validateArticle(attr);
	});

	// Lint
	return JSON.stringify(r, undefined, 2);
};
