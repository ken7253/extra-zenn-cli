import { describe, test, expect } from 'vitest';
import { argNormalizer } from './argNormalizer';

const argsMock = {
	'--': ['foo'],
	a: false,
	all: false,
	t: 'bar',
	type: 'bar',
};

describe('cacのコマンドライン引数を正規化する関数', () => {
	test('１文字で表される省略形のオプションを省く', () => {
		// Act
		const normalized = argNormalizer(argsMock);
		// Assert
		expect(normalized).not.toHaveProperty('a', false);
		expect(normalized).not.toHaveProperty('t', 'bar');
	});

	test('ダブルダッシュの入力を省く', () => {
		// Act
		const normalized = argNormalizer(argsMock);
		// Assert
		expect(normalized).not.toHaveProperty('--', ['foo']);
	});

	test('通常の引数は削除されていないこと', () => {
		// Act
		const normalized = argNormalizer(argsMock);
		// Assert
		expect(normalized).toHaveProperty('all', false);
		expect(normalized).toHaveProperty('type', 'bar');
	});
});
