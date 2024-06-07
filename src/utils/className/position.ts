import { PositionClassName, PositionValues, Udim2Params } from "../../types";
import { getClassName } from "./getClassName";
import { getClassNameProps } from "./getProps";
import { ClassNameValues, getClassNameValues } from "./getValues";

const positionClassNamePattern = ["^inset%-", "^top%-", "^right%-", "^bottom%-", "^left%-"];

export const getPositionValues = (className: string) => {
	const matches: string[] = getClassName(className, positionClassNamePattern);
	if (matches.isEmpty()) return;

	const props: Udim2Params = {
		xScale: 0,
		xOffset: 0,
		yScale: 0,
		yOffset: 0,
	};

	matches.forEach((match) => {
		const validated = getClassNameValues<PositionClassName, PositionValues>(match);
		getPositionProps(validated, props);
	});

	return new UDim2(props.xScale, props.xOffset, props.yScale, props.yOffset);
};

const getPositionProps = (values: ClassNameValues<PositionClassName, PositionValues>, props: Udim2Params) =>
	getClassNameProps(values, ({ pos1, pos2, value }, isPercent) => {
		switch (pos1) {
			case "inset":
				{
					if (pos2) {
						pos2 === "x"
							? isPercent
								? (props.xScale = value)
								: (props.xOffset = value)
							: isPercent
								? (props.yScale = value)
								: (props.yOffset = value);
					} else {
						if (isPercent) {
							props.xScale = value;
							props.yScale = value;
						} else {
							props.xOffset = value;
							props.yOffset = value;
						}
					}
				}
				break;

			case "top":
				{
					if (isPercent) {
						value === 1 ? (props.yScale = 0) : (props.yScale = value);
					} else {
						props.yOffset = value;
					}
				}
				break;

			case "right":
				{
					if (isPercent) {
						value === 1 ? (props.xScale = 1) : (props.xScale = 1 - value);
					} else {
						props.xScale = 1;
						props.xOffset = value * -1;
					}
				}
				break;

			case "bottom":
				{
					if (isPercent) {
						value === 1 ? (props.yScale = 1) : (props.yScale = 1 - value);
					} else {
						props.yScale = 1;
						props.yOffset = value * -1;
					}
				}
				break;

			case "left":
				{
					if (isPercent) {
						value === 1 ? (props.xScale = 0) : (props.xScale = value);
					} else {
						props.xOffset = value;
					}
				}
				break;
		}
	});
