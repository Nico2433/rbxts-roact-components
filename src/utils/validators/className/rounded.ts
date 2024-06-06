import { RoundedValues } from "../../../types";

export const roundedClassNamePattern = "rounded%-?%d?%a*";

export const validateRoundedClassName = (className: string) => {
	const [first, second] = className.split("-");
	const value = second;

	const possibleClasses = ["rounded"];
	const exists = possibleClasses.includes(first);
	if (!exists) throw error(`Invalid rounded className: ${className}`);

	if (value) {
		const possibleValues = ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"];
		const exists = possibleValues.includes(second);
		if (!exists) throw error(`Invalid rounded className: ${className}`);
	}

	return { value: value as RoundedValues | undefined };
};
