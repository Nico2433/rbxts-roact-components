import React from "react";
import { ReactScrollingFrame } from "../types";
import { getBaseProps } from "../utils";
import { UiCorner, UiListLayout, UiPadding, UiSizeConstraint } from "./utils";

const ScrollingFrame: React.FC<Readonly<ReactScrollingFrame>> = (props) => {
	const baseProps = getBaseProps<ScrollingFrame>(props);

	const baseEvents = baseProps.Event;
	const extraEvents = props.Event;

	const totalEvents = {
		...baseEvents,
		...extraEvents,
	};

	return (
		<scrollingframe {...baseProps} {...props} Event={totalEvents}>
			{props.children}
			<UiPadding className={props.className} />
			<UiCorner className={props.className} />
			<UiSizeConstraint className={props.className} />
			<UiListLayout className={props.className} />
		</scrollingframe>
	);
};

export default ScrollingFrame;
