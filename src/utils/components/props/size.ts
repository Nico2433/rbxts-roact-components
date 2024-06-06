import { MinMaxSizeClassName, SizeClassName, Udim2Params, Vector2Params } from "../../../types";
import { getPercentageNumber } from "../../numbers";
import {
	matchAllString,
	minMaxSizeClassNamePattern,
	sizeClassNamePattern,
	validateMinMaxSizeClassName,
	validateSizeClassName,
} from "../../validators";

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
		if (match.match("min")[0] || match.match("max")[0]) continue;
		const validated = validateSizeClassName(match);
		getSizeProps(validated, props);
	}

	return new UDim2(props.xScale, props.xOffset, props.yScale, props.yOffset);
};

interface ParamsSize {
	apply: SizeClassName;
	value: number | string;
}

const getSizeProps = ({ apply, value }: ParamsSize, props: Udim2Params) => {
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

export const getAutoSizeValues = (className: string) => {
	const autoSize = className.match("size%-auto")[0];
	if (autoSize) return "XY";

	const autoWidth = className.match("w%-auto")[0];
	if (autoWidth) return "X";

	const autoHeight = className.match("h%-auto")[0];
	if (autoHeight) return "Y";
};

export const getMinMaxSizeValues = (className: string) => {
	const matches: string[] = matchAllString(className, minMaxSizeClassNamePattern);
	if (matches.isEmpty()) return;

	const props: PropsMinMaxSize = {};

	for (const match of matches) {
		const validated = validateMinMaxSizeClassName(match);
		getMinMaxSizeProps(validated, props);
	}

	return {
		MinSize: props.min && new Vector2(props.min.x, props.min.y),
		MaxSize: props.max && new Vector2(props.max.x, props.max.y),
	};
};

interface PropsMinMaxSize {
	min?: Vector2Params;
	max?: Vector2Params;
}

interface ParamsMinMaxSize {
	apply: MinMaxSizeClassName;
	size: "w" | "h";
	value: number;
}

const getMinMaxSizeProps = ({ apply, size, value }: ParamsMinMaxSize, props: PropsMinMaxSize) => {
	switch (apply) {
		case "min":
			{
				props.min = {};
				size === "w" ? (props.min.x = value) : (props.min.y = value);
			}
			break;

		case "max":
			{
				props.max = {};
				size === "w" ? (props.max.x = value) : (props.max.y = value);
			}
			break;
	}
};
