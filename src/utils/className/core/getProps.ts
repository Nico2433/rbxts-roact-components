import { getPercentageNumber } from "../../numbers";
import { ClassNameValues } from "./getValues";

type CallbackFC<T extends string, K extends string | undefined, C extends string | number> = (
	values: ClassNameValues<T, K, C>,
	isPercent: boolean,
) => void;

export function getClassNameProps<T extends string, K extends string | undefined, C extends string | number>(
	values: ClassNameValues<T, K, C>,
	callback: CallbackFC<T, K, number>,
): void;

export function getClassNameProps<T extends string, K extends string | undefined, C extends string | number>(
	{ pos1, pos2, value }: ClassNameValues<T, K, C>,
	callback: CallbackFC<T, K, number>,
) {
	let newValue = value;
	let isPercent = false;

	// *----------- PARSES STRINGS LIKE 1%
	if (typeIs(value, "string")) {
		const percentage = getPercentageNumber(value);
		if (percentage) {
			newValue = percentage as C;
			isPercent = true;
		}
	}
	if (!typeIs(newValue, "number")) return;

	callback({ pos1, pos2, value: newValue }, isPercent);
}
