#!/usr/bin/env node
import { cac } from 'cac';
import { list } from './commands';

const cli = cac('ezc');

cli
	.command('list', 'list')
	.option('-b, --books', 'display Books list', {
		default: false,
	})
	.action(async (v: unknown) => console.log(await list(v)))
	.alias('ls');

cli.help();
cli.version('0.0.0');
cli.parse();
