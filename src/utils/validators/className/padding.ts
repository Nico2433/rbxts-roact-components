import type { PaddingClassName } from "../../../types";

export const paddingClassNamePattern = "p[xtyrbl]?%-(%d+|px)";

export const validatePaddingClassName = (className: string): { apply: PaddingClassName; value: number } => {
	const [first, second] = className.split("-");

	let value;
	if (second === "px") {
		value = 1;
	} else {
		value = tonumber(second);
	}

	const possibleClasses = ["p", "px", "py", "pt", "pr", "pb", "pl"];
	const exists = possibleClasses.includes(first);
	if (!exists || !value) throw error(`Invalid padding className: ${className}`);

	// *------ BASED LIKE TAILWIND
	return { apply: first as PaddingClassName, value: value * 4 };
};
