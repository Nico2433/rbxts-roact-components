import type { ReactComponent } from "../../types";
import { getAnchorValues, getAutoSizeValues, getBgOpacityValues, getPositionValues, getSizeValues } from "../className";

export const getBaseProps = <T extends GuiObject>({
	forwardRef,
	className = "",
	onHover,
}: ReactComponent<T>): Partial<React.InstanceProps<T> | { [key: string]: unknown }> => {
	return {
		ref: forwardRef,
		Event: {
			...(onHover && {
				MouseEnter: (rbx: T, x: number, y: number) => onHover(true, rbx, x, y),
				MouseLeave: (rbx: T, x: number, y: number) => onHover(false, rbx, x, y),
			}),
		},
		Visible: className.match("hidden")[0] ? false : true,
		...getAnchorValues(className),
		...getSizeValues(className),
		...getAutoSizeValues(className),
		...getPositionValues(className),
		...getBgOpacityValues(className),
	};
};
