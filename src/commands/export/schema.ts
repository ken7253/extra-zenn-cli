import { Output, string, object } from 'valibot';

export const ArgSchema = object({
	output: string(),
});

export type ArgData = Output<typeof ArgSchema>;
