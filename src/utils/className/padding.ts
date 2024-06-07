import { getClassName } from ".";
import { PaddingClassName } from "../../types";
import { getClassNameProps } from "./getProps";
import { ClassNameValues, getClassNameValues } from "./getValues";

export const paddingClassNamePattern = "^p[xy]?%-";

type Props = Partial<Pick<UIPadding, "PaddingTop" | "PaddingRight" | "PaddingBottom" | "PaddingLeft">>;

export const getPaddingValues = (className: string) => {
	const matches: string[] = getClassName(className, paddingClassNamePattern);
	if (matches.isEmpty()) return;

	const props: Props = {};

	matches.forEach((match) => {
		const validated = getClassNameValues<PaddingClassName>(match);
		getPaddingProps(validated, props);
	});

	return props;
};

const getPaddingProps = (values: ClassNameValues<PaddingClassName>, props: Props) =>
	getClassNameProps(values, ({ pos1, value }) => {
		switch (pos1) {
			case "p":
				{
					props.PaddingTop = new UDim(0, value);
					props.PaddingRight = new UDim(0, value);
					props.PaddingBottom = new UDim(0, value);
					props.PaddingLeft = new UDim(0, value);
				}
				break;

			case "px":
				{
					props.PaddingLeft = new UDim(0, value);
					props.PaddingRight = new UDim(0, value);
				}
				break;

			case "py":
				{
					props.PaddingTop = new UDim(0, value);
					props.PaddingBottom = new UDim(0, value);
				}
				break;

			case "pt":
				{
					props.PaddingTop = new UDim(0, value);
				}
				break;

			case "pr":
				{
					props.PaddingRight = new UDim(0, value);
				}
				break;

			case "pb":
				{
					props.PaddingBottom = new UDim(0, value);
				}
				break;

			case "pl":
				{
					props.PaddingLeft = new UDim(0, value);
				}
				break;
		}
	});
