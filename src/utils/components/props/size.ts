import { SizeClassName } from "../../../types";
import { numbersPattern } from "../../string";
import { sizeClassNamePattern, validateSizeClassName } from "../../validators";

export const getSizeValues = (className: string) => {
	const matches = className.gmatch(sizeClassNamePattern)();

	const props: Props = {
		x: 0,
		y: 0,
	};
	for (const match of matches) {
		if (typeIs(match, "string")) {
			const validated = validateSizeClassName(match);
			getSizeProps(validated, props);
		}
	}

	const xString = typeIs(props.x, "string");
	const yString = typeIs(props.y, "string");

	return new UDim2(
		xString ? tonumber((props.x as string).match(numbersPattern)[0]) ?? 0 : 0,
		xString ? 0 : (props.x as number),
		yString ? tonumber((props.y as string).match(numbersPattern)[0]) ?? 0 : 0,
		yString ? 0 : (props.y as number),
	);
};

interface Props {
	x: number | string;
	y: number | string;
}

interface Params {
	apply: SizeClassName;
	value: number | string;
}

const getSizeProps = ({ apply, value }: Params, props: Props) => {
	switch (apply) {
		case "size":
			{
				props.x = value;
				props.y = value;
			}
			break;

		case "w":
			{
				props.x = value;
			}
			break;

		case "h":
			{
				props.y = value;
			}
			break;
	}
};
