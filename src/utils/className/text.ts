import { textSizePrefixes } from "../values";
import { ClassNameValues, getClassName, getClassNameProps, getClassNameValues } from "./core";

const textSizePattern = "^text%-[xlsmg%d]+$";

export const getTextSizeValues = (className: string) => {
	const matches = getClassName(className, textSizePattern);
	if (matches.isEmpty()) return;

	const props: SizeProps = {};

	matches.forEach((match) => {
		const validated = getClassNameValues<string>(match, { prefixes: textSizePrefixes });
		getTextSizeProps(validated, props);
	});

	return {
		TextSize: props.value,
	};
};

interface SizeProps {
	value?: number;
}

const getTextSizeProps = (values: ClassNameValues<string>, props: SizeProps) =>
	getClassNameProps(values, ({ value }) => {
		props.value = value;
	});

const textAlignPattern = ["^text%-left", "^text%-center", "^text%-right"];

export const getAlignTextValues = (className: string) => {
	const matches = getClassName(className, textAlignPattern);
	if (matches.isEmpty()) return;

	let value: "Left" | "Center" | "Right" | undefined;
	matches.forEach((match) => {
		if (match.match("left")[0]) return (value = "Left");
		if (match.match("center")[0]) return (value = "Center");
		if (match.match("right")[0]) return (value = "Right");
	});

	return {
		TextXAlignment: value,
	};
};
