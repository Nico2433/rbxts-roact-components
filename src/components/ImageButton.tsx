import React from "react";
import { ReactImageButton } from "../types";
import { deleteDefaultProps, getBaseProps, getButtonProps, getImageProps } from "../utils";
import { UiCorner, UiListLayout, UiPadding, UiSizeConstraint } from "./utils";

const ImageButton: React.FC<Readonly<ReactImageButton>> = (props) => {
	const className = props.className;

	const passedProps = props;
	const baseProps = getBaseProps<ImageButton>(passedProps);
	const imageProps = getImageProps<ImageButton>(passedProps);
	const buttonProps = getButtonProps<ImageButton>(passedProps);
	deleteDefaultProps(passedProps);

	const baseEvents = baseProps.Event;
	const buttonEvents = buttonProps.Event;
	const extraEvents = passedProps.Event;

	const totalEvents = {
		...baseEvents,
		...buttonEvents,
		...extraEvents,
	};

	return (
		<imagebutton {...baseProps} {...imageProps} {...buttonProps} {...passedProps} Event={totalEvents}>
			{props.children}
			<UiPadding className={className} />
			<UiCorner className={className} />
			<UiSizeConstraint className={className} />
			<UiListLayout className={className} />
		</imagebutton>
	);
};

export default ImageButton;
