import type { AnchorClassName } from "../../../types";
import { bracketsPattern } from "../../string";

export const anchorClassNamePattern = "a[xy]?%-%[%d?%d?%d%]";

export const validateAnchorClassName = (className: string) => {
	const [first, second] = className.split("-");
	const value = tonumber(second.gsub(bracketsPattern, "")[0]);

	const possibleClasses = ["a", "ax", "ay"];
	const exists = possibleClasses.includes(first);
	if (!exists || !value) throw error(`Invalid anchor className: ${className}`);

	// *------ PERCENTAGE BASED
	return { apply: first as AnchorClassName, value: value / 100 };
};
