import React from "react";
import { ReactImageLabel } from "../types";
import { deleteDefaultProps, getBaseProps, getImageProps } from "../utils";
import { UiCorner, UiListLayout, UiPadding, UiSizeConstraint } from "./utils";

const ImageLabel: React.FC<Readonly<ReactImageLabel>> = (props) => {
	const passedProps = props;
	const baseProps = getBaseProps<ImageLabel>(passedProps);
	const imageProps = getImageProps<ImageLabel>(passedProps);
	deleteDefaultProps(passedProps);

	const baseEvents = baseProps.Event;
	const extraEvents = passedProps.Event;

	const totalEvents = {
		...baseEvents,
		...extraEvents,
	};

	return (
		<imagelabel {...baseProps} {...imageProps} {...passedProps} Event={totalEvents}>
			{props.children}
			<UiPadding className={props.className} />
			<UiCorner className={props.className} />
			<UiSizeConstraint className={props.className} />
			<UiListLayout className={props.className} />
		</imagelabel>
	);
};

export default ImageLabel;
