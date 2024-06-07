import { AnchorClassName, Vector2Params } from "../../types";
import { ClassNameValues, getClassName, getClassNameValues } from "./core";
import { getClassNameProps } from "./core/getProps";

const anchorClassNamePattern = "^a[xy]?%-";

export const getAnchorValues = (className: string) => {
	const matches = getClassName(className, anchorClassNamePattern);
	if (matches.isEmpty()) return;

	const props: Vector2Params = {};

	matches.forEach((match) => {
		const validated = getClassNameValues<AnchorClassName>(match, true, {
			method: "/",
			value: 100,
		});
		getAnchorProps(validated, props);
	});

	return {
		AnchorPoint: new Vector2(props.x, props.y),
	};
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
