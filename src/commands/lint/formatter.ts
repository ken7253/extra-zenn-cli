import type { ValidationError } from 'zenn-model';
import { red, yellow, gray } from 'chalk';

import type { ValidateResult } from './types';

const withIndent = (line: string) => `  ${line}`;

export const formatter = ([path, detail]: ValidateResult) => {
	if (detail === null) return '';

	const error = detail.filter(({ isCritical }) => isCritical);
	const warn = detail.filter(({ isCritical }) => !isCritical);

	const line = (problem: ValidationError[]) =>
		problem
			.map(({ isCritical, message, type }) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
				const category = isCritical ? red('error') : yellow('warn ');

				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
				return withIndent(`${category}  ${message}  ${gray.bgBlack(type)}`);
			})
			.join('\n');

	return [path, line(error), line(warn)].join('\n');
};
