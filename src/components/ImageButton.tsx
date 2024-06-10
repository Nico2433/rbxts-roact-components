import React from "react";
import { ReactImageButton } from "../types";
import { getBaseProps, getButtonProps, getImageProps } from "../utils";
import { UiCorner, UiListLayout, UiPadding, UiSizeConstraint } from "./utils";

const ImageButton: React.FC<Readonly<ReactImageButton>> = (props) => {
	const baseProps = getBaseProps<ImageButton>(props);
	const imageProps = getImageProps<ImageButton>(props);
	const buttonProps = getButtonProps<ImageButton>(props);

	const baseEvents = baseProps.Event;
	const buttonEvents = buttonProps.Event;
	const extraEvents = props.Event;

	const totalEvents = {
		...baseEvents,
		...buttonEvents,
		...extraEvents,
	};

	return (
		<imagebutton {...baseProps} {...imageProps} {...buttonProps} {...props} Event={totalEvents}>
			{props.children}
			<UiPadding className={props.className} />
			<UiCorner className={props.className} />
			<UiSizeConstraint className={props.className} />
			<UiListLayout className={props.className} />
		</imagebutton>
	);
};

export default ImageButton;
