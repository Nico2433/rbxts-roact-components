import React from "react";
import { ReactVideoFrame } from "../types";
import { deleteDefaultProps, getBaseProps } from "../utils";
import { UiCorner, UiListLayout, UiPadding, UiSizeConstraint } from "./utils";

const VideoFrame: React.FC<Readonly<ReactVideoFrame>> = (props) => {
	const className = props.className;

	const passedProps = props;
	const baseProps = getBaseProps<VideoFrame>(passedProps);
	deleteDefaultProps(passedProps);

	const baseEvents = baseProps.Event;
	const extraEvents = passedProps.Event;

	const totalEvents = {
		...baseEvents,
		...extraEvents,
	};

	return (
		<videoframe {...baseProps} {...passedProps} Event={totalEvents}>
			{props.children}
			<UiPadding className={className} />
			<UiCorner className={className} />
			<UiSizeConstraint className={className} />
			<UiListLayout className={className} />
		</videoframe>
	);
};

export default VideoFrame;
