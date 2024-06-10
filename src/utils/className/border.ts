import { BorderRadiusClassName, BorderRadiusValues, UdimParams } from "../../types";
import { borderRadiusPrefixes, borderWidthPrefixes } from "../values";
import { ClassNameValues, getClassName, getClassNameValues } from "./core";
import { getClassNameProps } from "./core/getProps";

const borderRadiusClassNamePattern = "^rounded%-?";

export const getBorderRadiusValues = (className: string) => {
	const matches = getClassName(className, borderRadiusClassNamePattern);
	if (matches.isEmpty()) return;

	const props: UdimParams = {
		scale: 0,
		offset: 0,
	};

	matches.forEach((match) => {
		const validated = getClassNameValues<BorderRadiusClassName, BorderRadiusValues | undefined>(match, {
			prefixes: borderRadiusPrefixes,
			defaultValue: borderRadiusPrefixes.default,
		});
		getBorderRadiusProps(validated, props);
	});

	return new UDim(props.scale, props.offset);
};

const getBorderRadiusProps = (
	values: ClassNameValues<BorderRadiusClassName, BorderRadiusValues | undefined>,
	props: UdimParams,
) =>
	getClassNameProps(values, ({ value }, isPercent) => {
		if (value === 1 && isPercent) return (props.scale = value);
		props.offset = value;
	});

const borderWidthPattern = ["^border$", "^border%-%d"];

export const getBorderWidthValues = (className: string) => {
	const matches = getClassName(className, borderWidthPattern);
	if (matches.isEmpty()) return;

	const props: WidthProps = {};

	matches.forEach((match) => {
		const validated = getClassNameValues(match, {
			defaultValue: borderWidthPrefixes.default,
		});
		getBorderWidthProps(validated, props);
	});

	return props;
};

interface WidthProps {
	BorderSizePixel?: number;
}

const getBorderWidthProps = (values: ClassNameValues, props: WidthProps) =>
	getClassNameProps(values, ({ value }) => {
		props.BorderSizePixel = value;
	});
