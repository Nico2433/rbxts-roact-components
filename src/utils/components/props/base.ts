import type { ReactComponent } from "../../../types";
import { getAnchorValues } from "./anchor";
import { getPositionValues } from "./position";
import { getAutoSizeValues, getSizeValues } from "./size";

export const getBaseProps = <T extends GuiObject>({
	forwardRef,
	className = "",
	onHover,
}: ReactComponent<T>): Partial<React.InstanceProps<T> | { [key: string]: unknown }> => {
	return {
		ref: forwardRef,
		Visible: className.match("hidden")[0] ? false : true,
		AnchorPoint: getAnchorValues(className),
		Size: getSizeValues(className),
		AutomaticSize: getAutoSizeValues(className),
		Position: getPositionValues(className),
		Event: {
			...(onHover && {
				MouseEnter: (rbx: T, x: number, y: number) => onHover(true, rbx, x, y),
				MouseLeave: (rbx: T, x: number, y: number) => onHover(false, rbx, x, y),
			}),
		},
	};
};
