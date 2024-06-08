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
	values: ClassNameValues<T, K, C>,
	callback: CallbackFC<T, K, string>,
	expectString: true,
): void;

export function getClassNameProps<T extends string, K extends string | undefined, C extends string | number>(
	{ pos1, pos2, value }: ClassNameValues<T, K, C>,
	callback: CallbackFC<T, K, C>,
	expectString?: boolean,
) {
	let newValue = value;
	let isPercent = false;

	if (expectString) {
		if (!typeIs(newValue, "string")) return;
	} else {
		// *----------- PARSES PERCENTAGE STRINGS
		if (typeIs(value, "string")) {
			const percentage = getPercentageNumber(value);
			if (percentage) {
				newValue = percentage as C;
				isPercent = true;
			}
		}

		if (!typeIs(newValue, "number")) return;
	}

	callback({ pos1, pos2, value: newValue }, isPercent);
}
