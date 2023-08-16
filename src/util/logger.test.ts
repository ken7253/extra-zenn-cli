import { describe, test, expect, vi } from 'vitest';
import { logger } from './logger';
import { SuccessResult, ErrorResult } from '../types';

const success: SuccessResult = {
	type: 'success',
	message: 'success message.',
};

const error: ErrorResult = {
	type: 'error',
	error: new Error('error message'),
};

describe('Result型を受け取りログを出力するlogger関数', () => {
	test('成功の結果を受け取った場合１度だけログを出力する', () => {
		// Arrange
		const mockLog = vi.spyOn(console, 'log');
		// Act
		logger(success);
		// Assert
		expect(mockLog).toBeCalledTimes(1);
		expect(mockLog).toBeCalledWith(success.message);

		mockLog.mockRestore();
	});

	test('エラーの結果を受け取った場合１度だけエラーを出力する', () => {
		// Arrange
		const mockError = vi.spyOn(console, 'error');
		// Act
		logger(error);
		// Assert
		expect(mockError).toBeCalledTimes(1);
		expect(mockError).toBeCalledWith(error.error);

		mockError.mockRestore();
	});
});
