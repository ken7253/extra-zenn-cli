import type { ValidationError } from 'zenn-model';
import type { ValidateResult } from './types';

const withIndent = (line: string) => `  ${line}`;

export const formatter = ([path, detail]: ValidateResult) => {
	if (detail === null) return '';

	const error = detail.filter(({ isCritical }) => isCritical);
	const warn = detail.filter(({ isCritical }) => !isCritical);

	const line = (problem: ValidationError[]) =>
		problem
			.map(({ isCritical, message, type }) => {
				const category = isCritical ? 'error' : 'warn ';

				return withIndent(`${category}  ${message}  ${type}`);
			})
			.join('\n');

	return [path, line(error), line(warn)].join('\n');
};
