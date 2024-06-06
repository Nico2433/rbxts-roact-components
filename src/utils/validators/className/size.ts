import { SizeClassName } from "../../../types";
import { getPercentageFromFraction } from "../../numbers";

export const sizeClassNamePattern = [
	"w%-%d+%.?%d*/?%d*",
	"w%-full",
	"w%-px",
	"h%-%d+%.?%d*/?%d*",
	"h%-full",
	"h%-px",
	"size%-%d+%.?%d*/?%d*",
	"size%-full",
	"size%-px",
];

export const validateSizeClassName = (className: string) => {
	const [first, second] = className.split("-");

	let value;
	const matchedBars = second.match("/")[0];

	if (second === "px") {
		value = 1;
	} else if (second === "full") {
		value = "1%";
	} else if (matchedBars) {
		value = second;
	} else {
		value = tonumber(second);
	}

	const possibleClasses = ["w", "h", "size"];
	const exists = possibleClasses.includes(first);
	if (!exists || !value) throw error(`Invalid size className: ${className}`);

	if (typeIs(value, "string")) {
		if (value !== "1%") {
			const percentage = getPercentageFromFraction(value);
			value = `${percentage}%`;
		}
	} else {
		value *= 4;
	}

	// *------ BASED LIKE TAILWIND
	return { apply: first as SizeClassName, value };
};
