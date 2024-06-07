import { OpacityClassName } from "../../types";
import { ClassNameValues, getClassName, getClassNameProps, getClassNameValues } from "./core";

export const opacityClassNamePattern = ["^opacity%-", "^bg%-opacity%-"];

export const getOpacityValues = (className: string) => {
	const matches = getClassName(className, opacityClassNamePattern);
	if (matches.isEmpty()) return;

	const props: Props = {};

	matches.forEach((match) => {
		const validated = getClassNameValues<OpacityClassName | "bg">(match, {
			calculate: { method: "/", value: 100 },
		});
		getOpacityProps(validated, props);
	});

	return props;
};

interface Props {
	Transparency?: number;
	BackgroundTransparency?: number;
}

const getOpacityProps = (values: ClassNameValues<OpacityClassName | "bg">, props: Props) =>
	getClassNameProps(values, ({ pos1, value }) => {
		switch (pos1) {
			case "bg":
				{
					props.BackgroundTransparency = value;
				}
				break;

			default:
				{
					props.Transparency = value;
				}
				break;
		}
	});
