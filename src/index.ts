#!/usr/bin/env node
import { cac } from 'cac';
import { list, ListInputSchema } from './commands';
import { logger } from './util/logger';
import { argNormalizer } from './util/argNormalizer';
import { safeParse } from 'valibot';

const cli = cac('ezc');

cli
	.command('list', 'list')
	.option('-b, --books', 'display Books list', {
		default: false,
	})
	.action((options) => {
		const args = safeParse(ListInputSchema, argNormalizer(options));
		if (args.success) {
			logger(list(args.data));
		} else {
			throw args.error;
		}
	})
	.alias('ls');

cli.help();
cli.version('0.0.0');
cli.parse();
