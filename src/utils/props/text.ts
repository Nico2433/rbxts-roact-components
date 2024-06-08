import { ReactTextComponent } from "../../types";
import { getAlignTextValues, getTextColorValues, getTextSizeValues } from "../className";
import { matchString } from "../string";

export const getTextProps = <T extends GuiObject>({
	text,
	className = "",
}: ReactTextComponent<T>): Partial<React.InstanceProps<T> | { [key: string]: unknown }> => {
	return {
		Text: text,
		TextScaled: matchString(className, "text%-auto") ? true : false,
		...getTextSizeValues(className), // *----- TextSize
		...getTextColorValues(className), // *----- TextColor3
		...getAlignTextValues(className), // *----- TextXAlignment
	};
};
