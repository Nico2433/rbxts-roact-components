import { BorderRadiusClassName, BorderRadiusValues, UdimParams } from "../../types";
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
		const validated = getClassNameValues<BorderRadiusClassName, BorderRadiusValues | undefined>(match);
		getBorderRadiusProps(validated, props);
	});

	return new UDim(props.scale, props.offset);
};

const getBorderRadiusProps = (
	values: ClassNameValues<BorderRadiusClassName, BorderRadiusValues | undefined>,
	props: UdimParams,
) =>
	getClassNameProps(values, ({ pos2, value }) => {
		if (value > 0) return (props.scale = value);
		let finalValue = 0;

		switch (pos2) {
			case "none":
				{
					props.scale = 0;
					props.offset = 0;
				}
				break;

			case "sm":
				{
					finalValue = 0.25;
				}
				break;

			case "md":
				{
					finalValue = 1.5;
				}
				break;

			case "lg":
				{
					finalValue = 2;
				}
				break;

			case "xl":
				{
					finalValue = 3;
				}
				break;

			case "2xl":
				{
					finalValue = 4;
				}
				break;

			case "3xl":
				{
					finalValue = 6;
				}
				break;

			default:
				{
					finalValue = 1;
				}
				break;
		}
		props.offset = finalValue * 4;
	});
