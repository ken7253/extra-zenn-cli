/**
 * 入力された引数から重複削除とダブルダッシュ以降の引数を削除する処理
 *
 * この関数の出力は型安全ではないため利用する際は [zod](https://zod.dev/) や [valibot](https://valibot.dev/) などで型の確認をしてから使用します。
 *
 * @param args cacから渡される引数オブジェクト
 *
 * @returns 重複などを削除した引数のオブジェクト
 */
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
