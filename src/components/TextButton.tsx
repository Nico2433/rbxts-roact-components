import React from "react";
import { ReactTextButton } from "../types";
import { deleteDefaultProps, getBaseProps, getButtonProps, getTextProps } from "../utils";
import { UiCorner, UiListLayout, UiPadding, UiSizeConstraint } from "./utils";

const TextButton: React.FC<Readonly<ReactTextButton>> = (props) => {
	const className = props.className;

	const passedProps = props;
	const baseProps = getBaseProps<TextButton>(passedProps);
	const textProps = getTextProps<TextButton>(passedProps);
	const buttonProps = getButtonProps<TextButton>(passedProps);
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
		<textbutton {...baseProps} {...textProps} {...buttonProps} {...passedProps} Event={totalEvents}>
			{props.children}
			<UiPadding className={className} />
			<UiCorner className={className} />
			<UiSizeConstraint className={className} />
			<UiListLayout className={className} />
		</textbutton>
	);
};

export default TextButton;
