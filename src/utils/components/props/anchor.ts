import { AnchorClassName } from "../../../types";
import { anchorClassNamePattern, validateAnchorClassName } from "../../validators";

export const getAnchorValues = (className: string) => {
	const matches = className.gmatch(anchorClassNamePattern);

	const props: Props = {
		x: undefined,
		y: undefined,
	};
	for (const match of matches) {
		const matchValue = match[0];
		if (typeIs(matchValue, "string")) {
			const validated = validateAnchorClassName(matchValue);
			getAnchorProps(validated, props);
		}
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
