import { ReactComponent } from "../../types";
import { getAlignTextValues, getTextColorValues, getTextOpacityValues, getTextSizeValues } from "../className";

export const getTextProps = <T extends GuiObject>({ className = "" }: ReactComponent<T>) => {
	return {
		TextScaled: className.match("text%-auto")[0] ? true : false,
		...getTextSizeValues(className), // *----- TextSize
		...getTextColorValues(className), // *----- TextColor3
		...getAlignTextValues(className), // *----- TextXAlignment
		...getTextOpacityValues(className), // *----- TextTransparency
	};
};
