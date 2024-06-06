import { PositionClassName } from "../../../types";

export const positionClassNamePattern = [
	"inset%-[xy]?%-?%d+%.?%d*/*%d*",
	"inset%-[xy]?%-px",
	"top%-%d+",
	"top%-%d+/%d+",
	"top%-px",
	"top%-full",
	"right%-%d+",
	"right%-%d+/%d+",
	"right%-px",
	"right%-full",
	"bottom%-%d+",
	"bottom%-%d+/%d+",
	"bottom%-px",
	"bottom%-full",
	"left%-%d+",
	"left%-%d+/%d+",
	"left%-px",
	"left%-full",
];

export const validatePositionClassName = (className: string) => {
	const [first, second, third] = className.split("-");

	let value;
	let inset: "x" | "y" | undefined;

	if (third) {
		second === "x" ? (inset = "x") : (inset = "y");
		const matchedBars = third.match("/")[0];
		if (third === "px") {
			value = 1;
		} else if (third === "full") {
			value = "1%";
		} else if (matchedBars) {
			value = third;
		} else {
			value = tonumber(third);
		}
	} else {
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
	}

	const possibleClasses = ["inset", "top", "right", "bottom", "left"];
	const exists = possibleClasses.includes(first);
	if (!exists || !value) throw error(`Invalid position className: ${className}`);

	if (typeIs(value, "string")) {
		if (value !== "1%") {
			const [a, b] = value.split("/");
			const numberA = tonumber(a);
			const numberB = tonumber(b);
			if (!numberA || !numberB) throw error(`Cannot convert to number: ${className}`);

			value = `${numberA / numberB}%`;
		}
	} else {
		value *= 4;
	}

	// *------ BASED LIKE TAILWIND
	return { apply: first as PositionClassName, inset, value };
};
