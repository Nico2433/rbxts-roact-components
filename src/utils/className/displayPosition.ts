import { AlignClassName, AlignValues, JustifyClassName, JustifyValues, UdimParams } from "../../types";
import { ClassNameValues, getClassName, getClassNameProps, getClassNameValues } from "./core";

const displayPositionPattern = ["^items%-", "^justify%-"];

export const getDisplayPositionValues = (className: string, flex?: "Horizontal" | "Vertical") => {
	const matches = getClassName(className, displayPositionPattern);
	if (matches.isEmpty()) return;

	const props: PositionProps = {};

	matches.forEach((match) => {
		const validated = getClassNameValues<AlignClassName | JustifyClassName, AlignValues | JustifyValues>(match);
		getDisplayPositionProps(validated, props, flex);
	});

	return props;
};

interface PositionProps {
	HorizontalAlignment?: "Left" | "Center" | "Right";
	VerticalAlignment?: "Center" | "Top" | "Bottom";
}

const getDisplayPositionProps = (
	values: ClassNameValues<AlignClassName | JustifyClassName, AlignValues | JustifyValues>,
	props: PositionProps,
	flex?: "Horizontal" | "Vertical",
) =>
	getClassNameProps(
		values,
		({ pos1, pos2 }) => {
			if (flex) {
				const isRow = flex === "Horizontal";

				if (pos1 === "items") {
					if (isRow) {
						if (pos2 === "start") props.VerticalAlignment = "Top";
						if (pos2 === "center") props.VerticalAlignment = "Center";
						if (pos2 === "end") props.VerticalAlignment = "Bottom";
					} else {
						if (pos2 === "start") props.HorizontalAlignment = "Left";
						if (pos2 === "center") props.HorizontalAlignment = "Center";
						if (pos2 === "end") props.HorizontalAlignment = "Right";
					}
				} else {
					if (isRow) {
						if (pos2 === "start") props.HorizontalAlignment = "Left";
						if (pos2 === "center") props.HorizontalAlignment = "Center";
						if (pos2 === "end") props.HorizontalAlignment = "Right";
					} else {
						if (pos2 === "start") props.VerticalAlignment = "Top";
						if (pos2 === "center") props.VerticalAlignment = "Center";
						if (pos2 === "end") props.VerticalAlignment = "Bottom";
					}
				}
			}
		},
		true,
	);

const gapPattern = "^gap%-";

export const getGapValues = (className: string) => {
	const matches = getClassName(className, gapPattern);
	if (matches.isEmpty()) return;

	const props: UdimParams = {};

	matches.forEach((match) => {
		const validated = getClassNameValues(match);
		getGapProps(validated, props);
	});

	return {
		Padding: new UDim(props.scale, props.offset),
	};
};

const getGapProps = (values: ClassNameValues, props: UdimParams) =>
	getClassNameProps(values, ({ value }) => {
		props.offset = value;
	});
