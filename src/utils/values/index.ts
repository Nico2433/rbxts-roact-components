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

	if (secondPrefix) {
		const existsSecond = values[secondPrefix];
		if (existsSecond) {
			value = existsSecond;
		}

		if (typeIs(value, "table")) {
			const numeric = tonumber(secondPrefix);
			if (numeric) {
				const existsNumeric = value[numeric];
				if (existsNumeric) value = existsNumeric;
			} else {
				value = value[secondPrefix];
			}
		}
	}

	if (typeIs(value, "string") || typeIs(value, "number")) return value;
};

export * from "./border";
export * from "./colors";
export * from "./size";
export * from "./text";
