export type Command = <T = unknown>(args: T) => Promise<string>;
