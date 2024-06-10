import React from "react";
import { ReactTextButton } from "../types";
import { getBaseProps, getButtonProps, getTextProps } from "../utils";
import { UiCorner, UiListLayout, UiPadding, UiSizeConstraint } from "./utils";

const TextButton: React.FC<Readonly<ReactTextButton>> = (props) => {
	const baseProps = getBaseProps<TextButton>(props);
	const textProps = getTextProps<TextButton>(props);
	const buttonProps = getButtonProps<TextButton>(props);

	const baseEvents = baseProps.Event;
	const buttonEvents = buttonProps.Event;
	const extraEvents = props.Event;

	const totalEvents = {
		...baseEvents,
		...buttonEvents,
		...extraEvents,
	};

	return (
		<textbutton {...baseProps} {...textProps} {...buttonProps} {...props} Event={totalEvents}>
			{props.children}
			<UiPadding className={props.className} />
			<UiCorner className={props.className} />
			<UiSizeConstraint className={props.className} />
			<UiListLayout className={props.className} />
		</textbutton>
	);
};

export default TextButton;
