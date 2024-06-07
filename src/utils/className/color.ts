import { colorsPrefixes } from "../values";
import { ClassNameValues, getClassName, getClassNameProps, getClassNameValues } from "./core";
import { opacityClassNamePattern } from "./opacity";

const bgColorClassNamePattern = ["^bg%-[%a]+%-", "^bg%-[%a]+"];

export const getBgColorValues = (className: string) => {
	const matches = getClassName(className, bgColorClassNamePattern, opacityClassNamePattern);
	if (matches.isEmpty()) return;

	let color: string | undefined = undefined;

	matches.forEach((match) => {
		const validated = getClassNameValues(match, {
			prefixes: colorsPrefixes,
		});
		getBgColorProps(validated, color);
	});

	return {
		BackgroundColor3: color && Color3.fromHex(color),
	};
};

const getBgColorProps = (value: ClassNameValues, color: string | undefined) =>
	getClassNameProps(
		value,
		({ value }) => {
			color = value;
		},
		true,
	);
