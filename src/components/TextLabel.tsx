import React from "react";
import { ReactTextLabel } from "../types";
import { getBaseProps, getTextProps } from "../utils";
import { UiCorner, UiListLayout, UiPadding, UiSizeConstraint } from "./utils";

const TextLabel: React.FC<Readonly<ReactTextLabel>> = (props) => {
	const baseProps = getBaseProps<TextLabel>(props);
	const textProps = getTextProps<TextLabel>(props);

	const baseEvents = baseProps.Event;
	const extraEvents = props.Event;

	const totalEvents = {
		...baseEvents,
		...extraEvents,
	};

	return (
		<textlabel {...baseProps} {...textProps} {...props} Event={totalEvents}>
			{props.children}
			<UiPadding className={props.className} />
			<UiCorner className={props.className} />
			<UiSizeConstraint className={props.className} />
			<UiListLayout className={props.className} />
		</textlabel>
	);
};

export default TextLabel;
