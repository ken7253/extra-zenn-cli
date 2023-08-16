#!/usr/bin/env node
import { cac } from 'cac';
import { list } from './commands';

const cli = cac();

cli
	.command('list', 'list')
	.action(() => {
		const result = list();
		if (result.type === 'success') {
			console.log(result.message);
		}
	})
	.alias('ls');

cli.help();
cli.version('0.0.0');
cli.parse();
