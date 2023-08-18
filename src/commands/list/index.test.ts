import { describe, test, expect } from 'vitest';

import { list } from './index';
import type { ArgData } from './schema';

describe('各種ファイルの一覧を出力するためのコマンド', () => {
	describe('オプションを指定しない場合', () => {
		test('コマンドが実行されること', () => {
			expect(() => list<ArgData>({ books: false })).not.toThrowError();
		});
	});
});
