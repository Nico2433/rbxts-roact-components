import React from "react";
import { ReactImageButton } from "../types";
import { getBaseProps, getButtonProps, getImageProps } from "../utils";
import { UiCorner, UiPadding, UiSizeConstraint } from "./utils";

const ImageButton: React.FC<Readonly<ReactImageButton>> = (props) => {
	const baseProps = getBaseProps<ImageButton>(props);
	const imageProps = getImageProps<ImageButton>(props);
	const buttonProps = getButtonProps<ImageButton>(props);

	const baseEvents = baseProps.Event;
	const buttonEvents = buttonProps.Event;

	const totalEvents = {
		...baseEvents,
		...buttonEvents,
	};

	return (
		<imagebutton {...baseProps} {...imageProps} {...buttonProps} Event={totalEvents}>
			{props.children}
			<UiPadding className={props.className} />
			<UiCorner className={props.className} />
			<UiSizeConstraint className={props.className} />
		</imagebutton>
	);
};

export default ImageButton;
