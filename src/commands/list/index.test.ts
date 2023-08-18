import path from 'node:path';
import { describe, test, expect } from 'vitest';

import { list } from './index';
import type { ArgData } from './schema';

describe('各種ファイルの一覧を出力するためのコマンド', () => {
	describe('オプションを指定しない場合', () => {
		test('コマンドが実行されること', () => {
			// Assert
			expect(() => list<ArgData>({ books: false })).not.toThrowError();
		});

		test('Markdownファイルのみ一覧で取得できること', async () => {
			// Act
			const stdout = await list<ArgData>({ books: false });
			const fileNameList = stdout.split(' ');
			const extNameList = fileNameList.map((name) => path.parse(name).ext);
			const nonMarkdownFile = extNameList.filter((v) => v !== '.md');
			// Assert
			expect(nonMarkdownFile).toStrictEqual([]);
		});
	});
});
