import { ReactComponent } from "../../types";
import { getImageOpacityValues } from "../className";

export const getImageProps = <T extends GuiObject>({ className = "" }: ReactComponent<T>) => {
	return {
		...getImageOpacityValues(className), // *----- ImageTransparency
	};
};
