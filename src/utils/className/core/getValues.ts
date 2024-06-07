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
	defaultValue?: number;
}

export function getClassNameValues<
	T extends string = string,
	K extends string | undefined = string,
	C extends string | number = string | number,
>(className: string, optParams?: OptParams): ClassNameValues<T, K, C>;

export function getClassNameValues<T extends string, K extends string | undefined>(
	className: string,
	{ prefixes, calculate, defaultValue = 0 }: OptParams = {},
) {
	const [key, value, optValue] = className.split("-");

	let finalValue = optValue ? optValue : value;
	let numericValue: string | number = defaultValue;

	if (finalValue) {
		const matchedBrackets = finalValue.match(bracketsPattern)[0];
		if (matchedBrackets) finalValue = finalValue.gsub(bracketsPattern, "")[0];
		const matchedBars = finalValue.match("/")[0];

		if (prefixes) {
			const exists1 = matchClassNamePrefix(finalValue, prefixes);
			if (exists1) {
				numericValue = exists1;
			} else {
				const exists2 = matchClassNamePrefix(value, prefixes, finalValue);
				if (exists2) numericValue = exists2;
			}
		}

		if (numericValue === defaultValue) {
			if (finalValue === "px") {
				numericValue = 1;
			} else if (finalValue === "full") {
				numericValue = "1%";
			} else if (matchedBars) {
				const percentage = getPercentageFromFraction(finalValue);
				numericValue = `${percentage}%`;
			} else {
				const exists = tonumber(finalValue);
				if (exists) numericValue = exists;
			}
		}
	}

	// *----------- ONLY APPLY TO PIXELS
	if (typeIs(numericValue, "number")) {
		if (calculate) {
			const { method, value } = calculate;
			method === "*" ? (numericValue *= value) : (numericValue /= value);
		} else {
			numericValue *= 4;
		}
	}

	return { pos1: key as T, pos2: value as K, value: numericValue };
}
