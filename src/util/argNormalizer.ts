export const argNormalizer = (args: unknown) => {
	if (args == null) return {};

	const keys = Object.keys(args);
	const filteredKeys = keys
		.filter((v) => v.length !== 1)
		.filter((v) => v !== '--');

	const filteredArgs = filteredKeys.reduce((acc, current) => {
		// FIX: type assertion
		return { ...acc, [current]: (args as Record<string, unknown>)[current] };
	}, {});

	return filteredArgs;
};
