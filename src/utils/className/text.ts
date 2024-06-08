import { matchString } from "../string";
import { ClassNameValues, getClassName, getClassNameProps, getClassNameValues } from "./core";

const textSizePattern = "^text%-[xlsmg%d]+$";

export const getTextSizeValues = (className: string) => {
	const matches = getClassName(className, textSizePattern);
	if (matches.isEmpty()) return;

	const props: SizeProps = {};

	matches.forEach((match) => {
		const validated = getClassNameValues<string>(match);
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

const textColorPattern = ["^text%-%a+%-", "^text%-black", "^text%-white"];

export const getTextColorValues = (className: string) => {
	const matches = getClassName(className, textColorPattern);
	if (matches.isEmpty()) return;

	const props: ColorProps = {};

	matches.forEach((match) => {
		const validated = getClassNameValues<string>(match);
		getTextColorProps(validated, props);
	});

	return {
		TextColor3: props.value && Color3.fromHex(props.value),
	};
};

interface ColorProps {
	value?: string;
}

const getTextColorProps = (values: ClassNameValues, props: ColorProps) =>
	getClassNameProps(
		values,
		({ value }) => {
			props.value = value;
		},
		true,
	);

const textAlignPattern = ["^text%-left", "^text%-center", "^text%-right"];

export const getAlignTextValues = (className: string) => {
	const matches = getClassName(className, textAlignPattern);
	if (matches.isEmpty()) return;

	let value: "Left" | "Center" | "Right" | undefined;
	matches.forEach((match) => {
		if (matchString(match, "left")) return (value = "Left");
		if (matchString(match, "center")) return (value = "Center");
		if (matchString(match, "right")) return (value = "Right");
	});

	return {
		TextXAlignment: value,
	};
};
