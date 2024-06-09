import { colorsPrefixes } from "../values";
import { ClassNameValues, getClassName, getClassNameProps, getClassNameValues } from "./core";
import { opacityClassNamePattern } from "./opacity";

const bgColorClassNamePattern = ["^bg%-[%a]+%-", "^bg%-[%a]+"];

export const getBgColorValues = (className: string) => {
	const matches = getClassName(className, bgColorClassNamePattern, opacityClassNamePattern);
	if (matches.isEmpty()) return;

	const props: Props = {};

	matches.forEach((match) => {
		const validated = getClassNameValues(match, {
			prefixes: colorsPrefixes,
		});
		getBgColorProps(validated, props);
	});

	return props;
};

interface Props {
	BackgroundColor3?: Color3;
}

const getBgColorProps = (value: ClassNameValues, props: Props) =>
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

	const props: ColorProps = {};

	matches.forEach((match) => {
		const validated = getClassNameValues<string>(match, { prefixes: colorsPrefixes });
		getTextColorProps(validated, props);
	});

	return props;
};

interface ColorProps {
	TextColor3?: Color3;
}

const getTextColorProps = (values: ClassNameValues, props: ColorProps) =>
	getClassNameProps(
		values,
		({ value }) => {
			props.TextColor3 = Color3.fromHex(value);
		},
		true,
	);
