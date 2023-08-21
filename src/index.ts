#!/usr/bin/env node
import { cac } from 'cac';
import { list, lint } from './commands';

const cli = cac('ezc');

cli
	.command('list', 'list')
	.option('-b, --books', 'display Books list', {
		default: false,
	})
	.option('-a, --all', 'display all files', {
		default: false,
	})
	.action(async (v: unknown) => console.log(await list(v)))
	.alias('ls');

cli
	.command('lint', 'linting for content')
	.action(async (v: unknown) => console.log(await lint(v)));

cli.help();
cli.version('0.0.0');
cli.parse();
