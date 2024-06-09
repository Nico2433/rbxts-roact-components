import { ReactTextComponent } from "../../types";
import { getAlignTextValues, getTextColorValues, getTextOpacityValues, getTextSizeValues } from "../className";

export const getTextProps = <T extends GuiObject>({
	text,
	className = "",
}: ReactTextComponent<T>): Partial<React.InstanceProps<T> | { [key: string]: unknown }> => {
	return {
		Text: text,
		TextScaled: className.match("text%-auto")[0] ? true : false,
		...getTextSizeValues(className), // *----- TextSize
		...getTextColorValues(className), // *----- TextColor3
		...getAlignTextValues(className), // *----- TextXAlignment
		...getTextOpacityValues(className), // *----- TextTransparency
	};
};
