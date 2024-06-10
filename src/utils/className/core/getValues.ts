import { getPercentageFromFraction } from "../../numbers";
import { bracketsPattern } from "../../string";
import { ClassNamePrefix, matchClassNamePrefix } from "../../values";

export interface ClassNameValues<
	T extends string = string,
	K extends string | undefined = string,
	C extends string | number = string | number,
> {
	pos1: T;
	pos2: K;
	value: C;
}

interface Calculate {
	method: "*" | "/";
	value: number;
}

interface OptParams {
	prefixes?: ClassNamePrefix;
	calculate?: Calculate;
	preventCalculate?: boolean;
	defaultValue?: number;
}

export function getClassNameValues<
	T extends string = string,
	K extends string | undefined = string,
	C extends string | number = string | number,
>(className: string, optParams?: OptParams): ClassNameValues<T, K, C>;

export function getClassNameValues<T extends string, K extends string | undefined>(
	className: string,
	{ prefixes, calculate, preventCalculate, defaultValue = 0 }: OptParams = {},
) {
	const [key, secondKey, thirdKey] = className.split("-");

	let finalValue = thirdKey ? thirdKey : secondKey;
	let value: string | number = defaultValue;

	if (finalValue) {
		const matchedBrackets = finalValue.match(bracketsPattern)[0];
		if (matchedBrackets) finalValue = finalValue.gsub(bracketsPattern, "")[0];
		const matchedBars = finalValue.match("/")[0];

		if (prefixes) {
			const exists = matchClassNamePrefix(secondKey, prefixes, finalValue);
			if (exists) value = exists;
		}

		// *----------- PERCENTAGE WILL BE NUMERIC STRING WITH % AT END
		if (value === defaultValue) {
			if (finalValue === "px") {
				value = 1;
			} else if (finalValue === "full") {
				value = "1%";
			} else if (matchedBars) {
				const percentage = getPercentageFromFraction(finalValue);
				value = `${percentage}%`;
			} else {
				const exists = tonumber(finalValue);
				if (exists) value = exists;
			}
		}
	}

	// *----------- ONLY APPLY TO PIXELS
	if (typeIs(value, "number") && !preventCalculate) {
		if (calculate) {
			const { method, value: calcValue } = calculate;
			method === "*" ? (value *= calcValue) : (value /= calcValue);
		} else {
			value *= 4;
		}
	}

	return { pos1: key as T, pos2: secondKey as K, value };
}
