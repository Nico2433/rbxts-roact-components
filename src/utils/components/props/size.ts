import { SizeClassName } from "../../../types";
import { isFloat } from "../../numbers";
import { matchAllString, sizeClassNamePattern, validateSizeClassName } from "../../validators";

export const getSizeValues = (className: string) => {
	const matches: string[] = matchAllString(className, sizeClassNamePattern);

	const props: Props = {
		x: 0,
		y: 0,
	};
	for (const match of matches) {
		const validated = validateSizeClassName(match);
		getSizeProps(validated, props);
	}

	if (typeIs(props.x, "string")) {
		props.x = tonumber(props.x.gsub("%%", "")[0]) ?? 0;
	}

	if (typeIs(props.y, "string")) {
		props.y = tonumber(props.y.gsub("%%", "")[0]) ?? 0;
	}

	const xFloat = isFloat(props.x);
	const yFloat = isFloat(props.y);

	return new UDim2(xFloat ? props.x : 0, xFloat ? 0 : props.x, yFloat ? props.y : 0, yFloat ? 0 : props.y);
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
