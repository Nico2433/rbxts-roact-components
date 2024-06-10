import React from "react";
import { ReactVideoFrame } from "../types";
import { getBaseProps } from "../utils";
import { UiCorner, UiListLayout, UiPadding, UiSizeConstraint } from "./utils";

const VideoFrame: React.FC<Readonly<ReactVideoFrame>> = (props) => {
	const baseProps = getBaseProps<VideoFrame>(props);

	const baseEvents = baseProps.Event;
	const extraEvents = props.Event;

	const totalEvents = {
		...baseEvents,
		...extraEvents,
	};

	return (
		<videoframe {...baseProps} {...props} Event={totalEvents}>
			{props.children}
			<UiPadding className={props.className} />
			<UiCorner className={props.className} />
			<UiSizeConstraint className={props.className} />
			<UiListLayout className={props.className} />
		</videoframe>
	);
};

export default VideoFrame;
