import React from "react";
import { ReactViewPortFrame } from "../types";
import { getBaseProps } from "../utils";
import { UiCorner, UiListLayout, UiPadding, UiSizeConstraint } from "./utils";

const ViewPortFrame: React.FC<Readonly<ReactViewPortFrame>> = (props) => {
	const baseProps = getBaseProps<ViewportFrame>(props);

	const baseEvents = baseProps.Event;
	const extraEvents = props.Event;

	const totalEvents = {
		...baseEvents,
		...extraEvents,
	};

	return (
		<viewportframe {...baseProps} {...props} Event={totalEvents}>
			{props.children}
			<UiPadding className={props.className} />
			<UiCorner className={props.className} />
			<UiSizeConstraint className={props.className} />
			<UiListLayout className={props.className} />
		</viewportframe>
	);
};

export default ViewPortFrame;
