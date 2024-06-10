import { getClassName } from "./core";

const flexPattern = ["^flex"];

export const getFlexValues = (className: string) => {
	const matches = getClassName(className, flexPattern);
	if (matches.isEmpty()) return;

	const props: Props = {};

	matches.forEach((match) => {
		getFlexProps(match, props);
	});

	return props;
};

interface Props {
	FillDirection?: "Horizontal" | "Vertical";
}

const getFlexProps = (match: string, props: Props) => {
	const isCol = match.match("column")[0];

	if (isCol) {
		props.FillDirection = "Vertical";
	} else {
		props.FillDirection = "Horizontal";
	}
};
