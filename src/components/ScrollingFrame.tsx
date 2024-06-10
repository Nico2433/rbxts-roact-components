import React from "react";
import { ReactScrollingFrame } from "../types";
import { deleteDefaultProps, getBaseProps } from "../utils";
import { UiCorner, UiListLayout, UiPadding, UiSizeConstraint } from "./utils";

const ScrollingFrame: React.FC<Readonly<ReactScrollingFrame>> = (props) => {
	const className = props.className;

	const passedProps = props;
	const baseProps = getBaseProps<ScrollingFrame>(passedProps);
	deleteDefaultProps(passedProps);

	const baseEvents = baseProps.Event;
	const extraEvents = passedProps.Event;

	const totalEvents = {
		...baseEvents,
		...extraEvents,
	};

	return (
		<scrollingframe {...baseProps} {...passedProps} Event={totalEvents}>
			{props.children}
			<UiPadding className={className} />
			<UiCorner className={className} />
			<UiSizeConstraint className={className} />
			<UiListLayout className={className} />
		</scrollingframe>
	);
};

export default ScrollingFrame;
