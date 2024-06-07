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

	return {
		BackgroundColor3: props.color && Color3.fromHex(props.color),
	};
};

interface Props {
	color?: string;
}

const getBgColorProps = (value: ClassNameValues, props: Props) =>
	getClassNameProps(
		value,
		({ value }) => {
			props.color = value;
		},
		true,
	);
