import { RoundedValues, UdimParams } from "../../../types";
import { matchAllString, roundedClassNamePattern, validateRoundedClassName } from "../../validators";

export const getRoundedValues = (className: string) => {
	const matches: string[] = matchAllString(className, roundedClassNamePattern);
	if (matches.isEmpty()) return;

	const props: UdimParams = {
		scale: 0,
		offset: 0,
	};

	for (const match of matches) {
		const validated = validateRoundedClassName(match);
		getRoundedProps(validated, props);
	}

	return new UDim(props.scale, props.offset);
};

interface Params {
	value?: RoundedValues;
}

const getRoundedProps = ({ value }: Params, props: UdimParams) => {
	switch (value) {
		case "none":
			{
				props.scale = 0;
				props.offset = 0;
			}
			break;

		case "sm":
			{
				props.offset = 0.25;
			}
			break;

		case "md":
			{
				props.offset = 1.5;
			}
			break;

		case "lg":
			{
				props.offset = 2;
			}
			break;

		case "xl":
			{
				props.offset = 3;
			}
			break;

		case "2xl":
			{
				props.offset = 4;
			}
			break;

		case "3xl":
			{
				props.offset = 6;
			}
			break;

		case "full":
			{
				props.scale = 1;
			}
			break;

		default:
			{
				props.offset = 1;
			}
			break;
	}
};
