import { SizeClassName } from "../../../types";

export const sizeClassNamePattern = ["w%-[%a%d/%.]+", "h%-[%a%d/%.]+", "size%-[%a%d/%.]+"];

export const validateSizeClassName = (className: string) => {
	const [first, second] = className.split("-");

	let value;
	const matchedBars = second.match("/")[0];

	if (second === "px") {
		value = 1;
	} else if (matchedBars) {
		value = second;
	} else {
		value = tonumber(second);
	}

	const possibleClasses = ["w", "h", "size"];
	const exists = possibleClasses.includes(first);
	if (!exists || !value) throw error(`Invalid size className: ${className}`);

	if (typeIs(value, "string")) {
		const [a, b] = value.split("/");
		const numberA = tonumber(a);
		const numberB = tonumber(b);
		if (!numberA || !numberB) throw error(`Cannot convert to number: ${className}`);

		value = numberA / numberB;
	} else {
		value *= 4;
	}

	// *------ BASED LIKE TAILWIND
	return { apply: first as SizeClassName, value };
};
