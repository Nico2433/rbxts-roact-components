import { PositionClassName } from "../../../types";
import { isFloat } from "../../numbers";
import { matchAllString, positionClassNamePattern, validatePositionClassName } from "../../validators";

export const getPositionValues = (className: string) => {
	const matches: string[] = matchAllString(className, positionClassNamePattern);

	const props: Props = {
		x: 0,
		y: 0,
	};
	for (const match of matches) {
		const validated = validatePositionClassName(match);
		getPositionProps(validated, props);
	}

	if (typeIs(props.x, "string")) {
		props.x = tonumber(props.x.gsub("%%", "")[0]) ?? 0;
	}

	if (typeIs(props.y, "string")) {
		props.y = tonumber(props.y.gsub("%%", "")[0]) ?? 0;
	}

	const xFloat = isFloat(props.x) && props.x < 1;
	const yFloat = isFloat(props.y) && props.x < 1;

	return new UDim2(xFloat ? props.x : 0, xFloat ? 0 : props.x, yFloat ? props.y : 0, yFloat ? 0 : props.y);
};

interface Props {
	x: number | string;
	y: number | string;
}

interface Params {
	apply: PositionClassName;
	inset?: "x" | "y";
	value: number | string;
}

const getPositionProps = ({ apply, inset, value }: Params, props: Props) => {
	let newValue = value;
	let isPercent = false;

	if (typeIs(value, "string")) {
		newValue = tonumber(value.gsub("%%", "")[0]) ?? 0;
		isPercent = true;
	}

	switch (apply) {
		case "inset":
			{
				if (inset) {
					inset === "x" ? (props.x = newValue) : (props.y = newValue);
				} else {
					props.x = newValue;
					props.y = newValue;
				}
			}
			break;

		case "top":
			{
				if (newValue === 1) {
					props.y = 0;
				} else {
					isPercent ? (props.y = `${newValue}%`) : (props.y = newValue);
				}
			}
			break;

		case "right":
			{
				if (typeIs(newValue, "number") && newValue !== 1) {
					isPercent ? (props.x = `${1 - newValue}%`) : (props.x = 1 - newValue);
				} else {
					props.x = newValue;
				}
			}
			break;

		case "bottom":
			{
				if (typeIs(newValue, "number") && newValue !== 1) {
					isPercent ? (props.y = `${1 - newValue}%`) : (props.y = 1 - newValue);
				} else {
					props.y = newValue;
				}
			}
			break;

		case "left":
			{
				if (newValue === 1) {
					props.y = 0;
				} else {
					isPercent ? (props.y = `${newValue}%`) : (props.y = newValue);
				}
			}
			break;
	}
};
