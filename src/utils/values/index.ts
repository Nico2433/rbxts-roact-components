export interface ClassNamePrefix {
	[key: string | number]:
		| string
		| number
		| {
				[key: string | number]: string | number;
		  };
}

export const matchClassNamePrefix = (prefix: string, values: ClassNamePrefix, secondPrefix?: string) => {
	let value = values[prefix];

	if (secondPrefix && typeIs(value, "table")) {
		value = value[secondPrefix];
	}

	if (typeIs(value, "string") || typeIs(value, "number")) return value;
};

export * from "./borderRadius";
export * from "./colors";
export * from "./size";
