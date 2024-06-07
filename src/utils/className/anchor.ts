import { AnchorClassName, Vector2Params } from "../../types";
import { getClassName } from "./getClassName";
import { getClassNameProps } from "./getProps";
import { ClassNameValues, getClassNameValues } from "./getValues";

export const anchorClassNamePattern = "^a[xy]?%-";

export const getAnchorValues = (className: string) => {
	const matches = getClassName(className, anchorClassNamePattern);
	if (matches.isEmpty()) return;

	const props: Vector2Params = {};

	matches.forEach((match) => {
		const validated = getClassNameValues<AnchorClassName>(match);
		getAnchorProps(validated, props);
	});

	return new Vector2(props.x, props.y);
};

const getAnchorProps = (values: ClassNameValues<AnchorClassName>, props: Vector2Params) =>
	getClassNameProps(values, ({ pos1, value }) => {
		switch (pos1) {
			case "a":
				{
					props.x = value;
					props.y = value;
				}
				break;

			case "ax":
				{
					props.x = value;
				}
				break;

			case "ay":
				{
					props.y = value;
				}
				break;
		}
	});
