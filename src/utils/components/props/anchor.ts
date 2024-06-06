import { AnchorClassName, Vector2Params } from "../../../types";
import { anchorClassNamePattern, matchAllString, validateAnchorClassName } from "../../validators";

export const getAnchorValues = (className: string) => {
	const matches = matchAllString(className, anchorClassNamePattern);
	if (matches.isEmpty()) return;

	const props: Vector2Params = {};

	for (const match of matches) {
		const validated = validateAnchorClassName(match);
		getAnchorProps(validated, props);
	}

	return new Vector2(props.x, props.y);
};

interface Params {
	apply: AnchorClassName;
	value: number;
}

const getAnchorProps = ({ apply, value }: Params, props: Vector2Params) => {
	switch (apply) {
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
};
