import { OpacityClassName } from "../../types";
import { ClassNameValues, getClassName, getClassNameProps, getClassNameValues } from "./core";

const bgOpacityClassNamePattern = ["^opacity%-", "^bg%-opacity%-"];

export const getBgOpacityValues = (className: string) => {
	const matches = getClassName(className, bgOpacityClassNamePattern);
	if (matches.isEmpty()) return;

	const props: Props = {};

	matches.forEach((match) => {
		const validated = getClassNameValues<OpacityClassName | "bg">(match, true, {
			method: "/",
			value: 100,
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
