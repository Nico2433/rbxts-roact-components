import { AnchorClassName } from "../../../types";
import { anchorClassNamePattern, matchAllString, validateAnchorClassName } from "../../validators";

export const getAnchorValues = (className: string) => {
	const matches = matchAllString(className, anchorClassNamePattern);

	const props: Props = {
		x: undefined,
		y: undefined,
	};
	for (const match of matches) {
		const validated = validateAnchorClassName(match);
		getAnchorProps(validated, props);
	}

	return new Vector2(props.x, props.y);
};

interface Props {
	x?: number;
	y?: number;
}

interface Params {
	apply: AnchorClassName;
	value: number;
}

const getAnchorProps = ({ apply, value }: Params, props: Props) => {
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
