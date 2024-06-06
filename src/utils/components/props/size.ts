import { SizeClassName, Udim2Params } from "../../../types";
import { getPercentageNumber } from "../../numbers";
import { matchAllString, sizeClassNamePattern, validateSizeClassName } from "../../validators";

export const getSizeValues = (className: string) => {
	const matches: string[] = matchAllString(className, sizeClassNamePattern);
	if (matches.isEmpty()) return;

	const props: Udim2Params = {
		xScale: 0,
		xOffset: 0,
		yScale: 0,
		yOffset: 0,
	};

	for (const match of matches) {
		const validated = validateSizeClassName(match);
		getSizeProps(validated, props);
	}

	return new UDim2(props.xScale, props.xOffset, props.yScale, props.yOffset);
};

interface Params {
	apply: SizeClassName;
	value: number | string;
}

const getSizeProps = ({ apply, value }: Params, props: Udim2Params) => {
	let newValue = value;
	let isPercent = false;

	if (typeIs(value, "string")) {
		newValue = getPercentageNumber(value) ?? 0;
		isPercent = true;
	}
	if (!typeIs(newValue, "number")) return;

	switch (apply) {
		case "size":
			{
				if (isPercent) {
					props.xScale = newValue;
					props.yScale = newValue;
				} else {
					props.xOffset = newValue;
					props.yOffset = newValue;
				}
			}
			break;

		case "w":
			{
				isPercent ? (props.xScale = newValue) : (props.xOffset = newValue);
			}
			break;

		case "h":
			{
				isPercent ? (props.yScale = newValue) : (props.yOffset = newValue);
			}
			break;
	}
};
