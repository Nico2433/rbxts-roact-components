import React from "react";
import { ReactVideoFrame } from "../types";
import { getBaseProps, getVideoProps } from "../utils";
import { UiCorner, UiListLayout, UiPadding, UiSizeConstraint } from "./utils";

const VideoFrame: React.FC<Readonly<ReactVideoFrame>> = (props) => {
	const baseProps = getBaseProps<VideoFrame>(props);
	const videoProps = getVideoProps<VideoFrame>(props);

	return (
		<videoframe {...baseProps} {...videoProps}>
			{props.children}
			<UiPadding className={props.className} />
			<UiCorner className={props.className} />
			<UiSizeConstraint className={props.className} />
			<UiListLayout className={props.className} />
		</videoframe>
	);
};

export default VideoFrame;
