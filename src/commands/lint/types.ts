import { ValidationError } from 'zenn-model';

type Path = string;

export type ValidateResult =
	| readonly [Path, null]
	| readonly [Path, ValidationError[]];
