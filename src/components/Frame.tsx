import React from "react";
import type { ReactFrame } from "../types/components";
import { deleteDefaultProps, getBaseProps } from "../utils";
import { UiCorner, UiListLayout, UiPadding, UiSizeConstraint } from "./utils";

const Frame: React.FC<Readonly<ReactFrame>> = (props) => {
	const passedProps = props;
	const baseProps = getBaseProps<Frame>(passedProps);
	deleteDefaultProps(passedProps);

	const baseEvents = baseProps.Event;
	const extraEvents = passedProps.Event;

	const totalEvents = {
		...baseEvents,
		...extraEvents,
	};

	return (
		<frame {...baseProps} {...passedProps} Event={totalEvents}>
			{props.children}
			<UiPadding className={props.className} />
			<UiCorner className={props.className} />
			<UiSizeConstraint className={props.className} />
			<UiListLayout className={props.className} />
		</frame>
	);
};

export default Frame;
