import { PositionClassName, Udim2Params } from "../../../types";
import { getPercentageNumber } from "../../numbers";
import { matchAllString, positionClassNamePattern, validatePositionClassName } from "../../validators";

export const getPositionValues = (className: string) => {
	const matches: string[] = matchAllString(className, positionClassNamePattern);
	if (matches.isEmpty()) return;

	const props: Udim2Params = {
		xScale: 0,
		xOffset: 0,
		yScale: 0,
		yOffset: 0,
	};

	for (const match of matches) {
		const validated = validatePositionClassName(match);
		getPositionProps(validated, props);
	}

	return new UDim2(props.xScale, props.xOffset, props.yScale, props.yOffset);
};

interface Params {
	apply: PositionClassName;
	inset?: "x" | "y";
	value: number | string;
}

const getPositionProps = ({ apply, inset, value }: Params, props: Udim2Params) => {
	let newValue = value;
	let isPercent = false;

	if (typeIs(value, "string")) {
		newValue = getPercentageNumber(value) ?? 0;
		isPercent = true;
	}
	if (!typeIs(newValue, "number")) return;

	switch (apply) {
		case "inset":
			{
				if (inset) {
					inset === "x"
						? isPercent
							? (props.xScale = newValue)
							: (props.xOffset = newValue)
						: isPercent
							? (props.yScale = newValue)
							: (props.yOffset = newValue);
				} else {
					if (isPercent) {
						props.xScale = newValue;
						props.yScale = newValue;
					} else {
						props.xOffset = newValue;
						props.yOffset = newValue;
					}
				}
			}
			break;

		case "top":
			{
				if (isPercent) {
					newValue === 1 ? (props.yScale = 0) : (props.yScale = newValue);
				} else {
					props.yOffset = newValue;
				}
			}
			break;

		case "right":
			{
				if (isPercent) {
					newValue === 1 ? (props.xScale = 1) : (props.xScale = 1 - newValue);
				} else {
					props.xScale = 1;
					props.xOffset = newValue * -1;
				}
			}
			break;

		case "bottom":
			{
				if (isPercent) {
					newValue === 1 ? (props.yScale = 1) : (props.yScale = 1 - newValue);
				} else {
					props.yScale = 1;
					props.yOffset = newValue * -1;
				}
			}
			break;

		case "left":
			{
				if (isPercent) {
					newValue === 1 ? (props.xScale = 0) : (props.xScale = newValue);
				} else {
					props.xOffset = newValue;
				}
			}
			break;
	}
};
