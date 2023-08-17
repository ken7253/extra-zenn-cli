export const argNormalizer = <T extends Record<string, unknown>>(args: T) => {
	const keys = Object.keys(args);
	const filteredKeys = keys
		.filter((v) => v.length !== 1)
		.filter((v) => v !== '--');

	const filteredArgs = filteredKeys.reduce((acc, current) => {
		return { ...acc, [current]: args[current] };
	}, {});

	return filteredArgs;
};
