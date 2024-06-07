export interface ClassNamePrefix {
	[key: string | number]: number;
}

export const matchClassNamePrefix = (prefix: string, values: ClassNamePrefix) => {
	const value = values[prefix];
	if (value) return value;
};

export * from "./borderRadius";
export * from "./size";
