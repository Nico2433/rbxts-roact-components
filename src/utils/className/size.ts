import { SizeClassName, SizeConstraintClassName, SizeConstraintValues, Udim2Params, Vector2Params } from "../../types";
import { matchString } from "../string";
import { maxSizePrefixes } from "../values";
import { ClassNameValues, getClassName, getClassNameValues } from "./core";
import { getClassNameProps } from "./core/getProps";

const sizePatterns = ["^size%-", "^[wh]%-"];

export const getSizeValues = (className: string) => {
	const matches = getClassName(className, sizePatterns);
	if (matches.isEmpty()) return;

	const props: Udim2Params = {
		xScale: 0,
		xOffset: 0,
		yScale: 0,
		yOffset: 0,
	};

	matches.forEach((match) => {
		const validated = getClassNameValues<SizeClassName>(match);
		getSizeProps(validated, props);
	});

	return {
		Size: new UDim2(props.xScale, props.xOffset, props.yScale, props.yOffset),
	};
};

const getSizeProps = (values: ClassNameValues<SizeClassName>, props: Udim2Params) =>
	getClassNameProps(values, ({ pos1, value }, isPercent) => {
		switch (pos1) {
			case "size":
				{
					if (isPercent) {
						props.xScale = value;
						props.yScale = value;
					} else {
						props.xOffset = value;
						props.yOffset = value;
					}
				}
				break;

			case "w":
				{
					isPercent ? (props.xScale = value) : (props.xOffset = value);
				}
				break;

			case "h":
				{
					isPercent ? (props.yScale = value) : (props.yOffset = value);
				}
				break;
		}
	});

const autoSizePatterns = ["^size%-auto", "^[wh]%-auto"];

export const getAutoSizeValues = (className: string) => {
	const matches = getClassName(className, autoSizePatterns);
	if (matches.isEmpty()) return;

	let value: "XY" | "X" | "Y" | undefined;
	matches.forEach((match) => {
		if (matchString(match, "size")) return (value = "XY");
		if (matchString(match, "w")) return (value = "X");
		if (matchString(match, "h")) return (value = "Y");
	});

	return {
		AutomaticSize: value,
	};
};

const sizeConstraintPatterns = ["^min%-[wh]", "^max%-[wh]"];

export const getSizeConstraintValues = (className: string) => {
	const matches = getClassName(className, sizeConstraintPatterns);
	if (matches.isEmpty()) return;

	const props: SizeConstraintProps = {};

	matches.forEach((match) => {
		const validated = getClassNameValues<SizeConstraintClassName, SizeConstraintValues>(match, {
			prefixes: maxSizePrefixes,
		});
		getSizeConstraintProps(validated, props);
	});

	const inf = math.huge;
	return {
		MinSize: props.min && new Vector2(props.min.x ?? inf, props.min.y ?? inf),
		MaxSize: props.max && new Vector2(props.max.x ?? inf, props.max.y ?? inf),
	};
};

interface SizeConstraintProps {
	min?: Vector2Params;
	max?: Vector2Params;
}

const getSizeConstraintProps = (
	values: ClassNameValues<SizeConstraintClassName, SizeConstraintValues>,
	props: SizeConstraintProps,
) =>
	getClassNameProps(values, ({ pos1, pos2, value }) => {
		switch (pos1) {
			case "min":
				{
					if (!props.min) props.min = {};
					pos2 === "w" ? (props.min.x = value) : (props.min.y = value);
				}
				break;

			case "max":
				{
					if (!props.max) props.max = {};
					pos2 === "w" ? (props.max.x = value) : (props.max.y = value);
				}
				break;
		}
	});
