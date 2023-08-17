import { Output, boolean, object } from 'valibot';

const ArgSchema = object({
	books: boolean(),
});

export type ArgData = Output<typeof ArgSchema>;
