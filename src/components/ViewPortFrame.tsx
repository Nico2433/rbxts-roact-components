import React from "react";
import { ReactViewPortFrame } from "../types";
import { deleteDefaultProps, getBaseProps } from "../utils";
import { UiCorner, UiListLayout, UiPadding, UiSizeConstraint } from "./utils";

const ViewPortFrame: React.FC<Readonly<ReactViewPortFrame>> = (props) => {
	const passedProps = props;
	const baseProps = getBaseProps<ViewportFrame>(passedProps);
	deleteDefaultProps(passedProps);

	const baseEvents = baseProps.Event;
	const extraEvents = passedProps.Event;

	const totalEvents = {
		...baseEvents,
		...extraEvents,
	};

	return (
		<viewportframe {...baseProps} {...passedProps} Event={totalEvents}>
			{props.children}
			<UiPadding className={props.className} />
			<UiCorner className={props.className} />
			<UiSizeConstraint className={props.className} />
			<UiListLayout className={props.className} />
		</viewportframe>
	);
};

export default ViewPortFrame;
