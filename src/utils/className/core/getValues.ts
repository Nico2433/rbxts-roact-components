import { getPercentageFromFraction } from "../../numbers";
import { bracketsPattern } from "../../string";

export interface ClassNameValues<
	T extends string,
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

export function getClassNameValues<
	T extends string = string,
	K extends string | undefined = string,
	C extends string | number = string | number,
>(className: string, parsePercentage?: boolean, calculate?: Calculate): ClassNameValues<T, K, C>;

export function getClassNameValues<T extends string, K extends string | undefined, C extends string | number>(
	className: string,
	parsePercentage: true,
	calculate?: Calculate,
): ClassNameValues<T, K, C>;

export function getClassNameValues<T extends string, K extends string | undefined>(
	className: string,
	parsePercentage: false,
	calculate?: Calculate,
): ClassNameValues<T, K, number>;

export function getClassNameValues<T extends string, K extends string | undefined, C extends string | number>(
	className: string,
	parsePercentage: boolean = true,
	calculate: Calculate = {
		method: "*",
		value: 4,
	},
) {
	const [key, value, optValue] = className.split("-");

	let finalValue = optValue ? optValue : value;
	let numericValue;

	if (finalValue) {
		const matchedBrackets = finalValue.match(bracketsPattern)[0];
		if (matchedBrackets) finalValue = finalValue.gsub(bracketsPattern, "")[0];
		const matchedBars = finalValue.match("/")[0];

		if (finalValue === "px") {
			numericValue = 1;
		} else if (parsePercentage && (matchedBars || finalValue === "full")) {
			if (finalValue === "full") {
				numericValue = "1%";
			} else {
				const percentage = getPercentageFromFraction(finalValue);
				numericValue = `${percentage}%`;
			}
		} else {
			numericValue = tonumber(finalValue);
		}

		// *----------- ONLY APPLY TO PIXELS
		if (typeIs(numericValue, "number")) {
			const { method, value } = calculate;
			if (method && value) method === "*" ? (numericValue *= value) : (numericValue /= value);
		}
	}

	return { pos1: key as T, pos2: value as K, value: (numericValue ?? 0) as C };
}
