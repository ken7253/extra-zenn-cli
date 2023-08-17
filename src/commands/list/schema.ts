import { Output, boolean, object } from 'valibot';

export const ArgSchema = object({
	books: boolean(),
});

export type ArgData = Output<typeof ArgSchema>;
