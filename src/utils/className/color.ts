import { colorsPrefixes } from "../values";
import { ClassNameValues, getClassName, getClassNameProps, getClassNameValues } from "./core";
import { opacityClassNamePattern } from "./opacity";

const bgColorClassNamePattern = ["^bg%-[%a]+%-", "^bg%-[%a]+"];

export const getBgColorValues = (className: string) => {
	const matches = getClassName(className, bgColorClassNamePattern, opacityClassNamePattern);
	if (matches.isEmpty()) return;

	const props: BgProps = {};

	matches.forEach((match) => {
		const validated = getClassNameValues(match, {
			prefixes: colorsPrefixes,
		});
		getBgColorProps(validated, props);
	});

	return props;
};

interface BgProps {
	BackgroundColor3?: Color3;
}

const getBgColorProps = (value: ClassNameValues, props: BgProps) =>
	getClassNameProps(
		value,
		({ value }) => {
			props.BackgroundColor3 = Color3.fromHex(value);
		},
		true,
	);

const textColorPattern = ["^text%-%a+%-", "^text%-black", "^text%-white"];

export const getTextColorValues = (className: string) => {
	const matches = getClassName(className, textColorPattern);
	if (matches.isEmpty()) return;

	const props: TextProps = {};

	matches.forEach((match) => {
		const validated = getClassNameValues<string>(match, { prefixes: colorsPrefixes });
		getTextColorProps(validated, props);
	});

	return props;
};

interface TextProps {
	TextColor3?: Color3;
}

const getTextColorProps = (values: ClassNameValues, props: TextProps) =>
	getClassNameProps(
		values,
		({ value }) => {
			props.TextColor3 = Color3.fromHex(value);
		},
		true,
	);

const borderColorClassNamePattern = ["^border%-%a+%-", "^border%-black", "^border%-white"];

export const getBorderColorValues = (className: string) => {
	const matches = getClassName(className, borderColorClassNamePattern);
	if (matches.isEmpty()) return;

	const props: BorderProps = {};

	matches.forEach((match) => {
		const validated = getClassNameValues<string>(match, { prefixes: colorsPrefixes, preventCalculate: true });
		getBorderColorProps(validated, props);
	});

	return props;
};

interface BorderProps {
	BorderColor3?: Color3;
}

const getBorderColorProps = (values: ClassNameValues, props: BorderProps) =>
	getClassNameProps(
		values,
		({ value }) => {
			props.BorderColor3 = Color3.fromHex(value);
		},
		true,
	);
