import type { ReactComponent } from "../../types";
import {
	getAnchorValues,
	getAutoSizeValues,
	getBgColorValues,
	getOpacityValues,
	getPositionValues,
	getSizeValues,
} from "../className";
import { matchString } from "../string";

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
		Visible: matchString(className, "hidden") ? false : true,
		...getAnchorValues(className), // *----- AnchorPoint
		...getSizeValues(className), // *----- Size
		...getAutoSizeValues(className), // *----- AutomaticSize
		...getPositionValues(className), // *----- Position
		...getOpacityValues(className), // *----- Transparency | BackgroundTransparency
		...getBgColorValues(className), // *----- BackgroundColor3
	};
};
