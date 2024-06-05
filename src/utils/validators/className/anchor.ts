import type { AnchorClassName } from "../../../types";
import { numbersPattern } from "../../string";

export const anchorClassNamePattern = "a[xy]?%-%[%d+%]";

export const validateAnchorClassName = (className: string) => {
	const [first, second] = className.split("-");
	const value = tonumber(second.match(numbersPattern)[0]);

	const possibleClasses = ["a", "ax", "ay"];
	const exists = possibleClasses.includes(first);
	if (!exists || !value) throw error(`Invalid anchor className: ${className}`);

	// *------ PERCENTAGE BASED
	return { apply: first as AnchorClassName, value: value / 100 };
};
