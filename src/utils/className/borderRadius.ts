import { BorderRadiusClassName, BorderRadiusValues, UdimParams } from "../../types";
import { borderRadius } from "../values";
import { ClassNameValues, getClassName, getClassNameValues } from "./core";
import { getClassNameProps } from "./core/getProps";

const roundedClassNamePattern = "^rounded%-?";

export const getBorderRadiusValues = (className: string) => {
	const matches = getClassName(className, roundedClassNamePattern);
	if (matches.isEmpty()) return;

	const props: UdimParams = {
		scale: 0,
		offset: 0,
	};

	matches.forEach((match) => {
		const validated = getClassNameValues<BorderRadiusClassName, BorderRadiusValues | undefined>(match, {
			prefixes: borderRadius,
			defaultValue: 1,
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
