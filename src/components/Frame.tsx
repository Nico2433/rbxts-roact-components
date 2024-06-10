import React from "react";
import type { ReactFrame } from "../types/components";
import { deleteDefaultProps, getBaseProps } from "../utils";
import { UiCorner, UiListLayout, UiPadding, UiSizeConstraint } from "./utils";

const Frame: React.FC<Readonly<ReactFrame>> = (props) => {
	const className = props.className;

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
			<UiPadding className={className} />
			<UiCorner className={className} />
			<UiSizeConstraint className={className} />
			<UiListLayout className={className} />
		</frame>
	);
};

export default Frame;
