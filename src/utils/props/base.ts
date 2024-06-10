import type { ReactComponent } from "../../types";
import {
	getAnchorValues,
	getAutoSizeValues,
	getBgColorValues,
	getBorderColorValues,
	getBorderWidthValues,
	getOpacityValues,
	getPositionValues,
	getSizeValues,
	getZIndexValues,
} from "../className";

export const getBaseProps = <T extends GuiObject>(
	{ forwardRef, className = "", onHover }: ReactComponent<T>,
	ref?: React.RefObject<T>,
) => {
	return {
		ref: ref ? ref : forwardRef,
		Event: {
			...(onHover && {
				MouseEnter: (rbx: T, x: number, y: number) => onHover(true, rbx, x, y),
				MouseLeave: (rbx: T, x: number, y: number) => onHover(false, rbx, x, y),
			}),
		},
		Visible: className.match("%--hidden")[0] ? false : true,
		...getAnchorValues(className), // *----- AnchorPoint
		...getSizeValues(className), // *----- Size
		...getAutoSizeValues(className), // *----- AutomaticSize
		...getPositionValues(className), // *----- Position
		...getOpacityValues(className), // *----- Transparency | BackgroundTransparency
		...getBgColorValues(className), // *----- BackgroundColor3
		...getBorderColorValues(className), // *----- BorderColor3
		...getBorderWidthValues(className), // *----- BorderSizePixel
		...getZIndexValues(className), // *----- ZIndex
	};
};
