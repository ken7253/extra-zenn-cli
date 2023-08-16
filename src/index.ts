#!/usr/bin/env node
import { cac } from 'cac';
import { list } from './commands';
import { logger } from './util/logger';

const cli = cac();

cli
	.command('list', 'list')
	.action(() => {
		logger(list());
	})
	.alias('ls');

cli.help();
cli.version('0.0.0');
cli.parse();
