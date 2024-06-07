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
		if (values[secondPrefix]) {
			value = values[secondPrefix];
		}

		if (typeIs(value, "table")) {
			const numeric = tonumber(secondPrefix);
			if (numeric && value[numeric]) {
				value = value[numeric];
			} else {
				value = value[secondPrefix];
			}
		}
	}

	if (typeIs(value, "string") || typeIs(value, "number")) return value;
};

export * from "./borderRadius";
export * from "./colors";
export * from "./size";
