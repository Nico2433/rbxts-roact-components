import { getDisplayPositionValues, getGapValues } from "../className";

export const getUiDisplayProps = (className: string, flex?: "Horizontal" | "Vertical") => {
	return {
		...getDisplayPositionValues(className, flex), // *----- Horizontal/Vertical Alignment,
		...getGapValues(className), // *----- Padding
	};
};
