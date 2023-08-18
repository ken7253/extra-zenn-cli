import { Output, boolean, object } from 'valibot';

export const ArgSchema = object({
	books: boolean(),
	all: boolean(),
});

export type ArgData = Output<typeof ArgSchema>;
