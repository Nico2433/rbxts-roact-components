import React from "react";
import { ReactImageLabel } from "../types";
import { getBaseProps, getImageProps } from "../utils";
import { UiCorner, UiListLayout, UiPadding, UiSizeConstraint } from "./utils";

const ImageLabel: React.FC<Readonly<ReactImageLabel>> = (props) => {
	const baseProps = getBaseProps<ImageLabel>(props);
	const imageProps = getImageProps<ImageLabel>(props);

	const baseEvents = baseProps.Event;
	const extraEvents = props.Event;

	const totalEvents = {
		...baseEvents,
		...extraEvents,
	};

	return (
		<imagelabel {...baseProps} {...imageProps} {...props} Event={totalEvents}>
			{props.children}
			<UiPadding className={props.className} />
			<UiCorner className={props.className} />
			<UiSizeConstraint className={props.className} />
			<UiListLayout className={props.className} />
		</imagelabel>
	);
};

export default ImageLabel;
