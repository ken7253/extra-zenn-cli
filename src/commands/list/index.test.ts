import path from 'node:path';
import { describe, test, expect } from 'vitest';

import { list } from './index';
import type { ArgData } from './schema';

/**
 * 引数のモック
 */
const defaultArgs: ArgData = {
	books: false,
	all: false,
};

describe('各種ファイルの一覧を出力するためのコマンド', () => {
	describe('オプションを指定しない場合', () => {
		test('コマンドが実行されること', () => {
			// Assert
			expect(() => list<ArgData>({ ...defaultArgs })).not.toThrowError();
		});

		test('Markdownファイルのみ一覧で取得できること', async () => {
			// Act
			const stdout = await list<ArgData>({ ...defaultArgs });
			const fileNameList = stdout.split(' ');
			const extNameList = fileNameList.map((name) => path.parse(name).ext);
			const excludedMarkdownFile = extNameList.filter((v) => v !== '.md');
			// Assert
			expect(excludedMarkdownFile).toStrictEqual([]);
		});
	});

	describe('allオプション', () => {
		test('Markdown以外のファイルも取得できること', async () => {
			// /articles 内部のファイルに依存したテスト
			// Arrange
			const stdout = await list<ArgData>({ ...defaultArgs, all: true });
			const fileNameList = stdout.split(' ');
			// Assert
			expect(fileNameList).toContain('notMarkdown.js');
		});
	});
});
