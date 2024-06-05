import type { ReactComponent } from "../../../types";
import { getAnchorValues } from "./anchor";
import { getSizeValues } from "./size";

export const getBaseProps = <T extends GuiObject>({
	forwardRef,
	className = "",
}: ReactComponent<T>): Partial<React.InstanceProps<T> | { [key: string]: unknown }> => {
	return {
		ref: forwardRef,
		Visible: className.match("hidden")[0] ? true : false,
		AnchorPoint: getAnchorValues(className),
		Size: getSizeValues(className),
	};
};
