import React from "react";
import { ReactTextLabel } from "../types";
import { deleteDefaultProps, getBaseProps, getTextProps } from "../utils";
import { UiCorner, UiListLayout, UiPadding, UiSizeConstraint } from "./utils";

const TextLabel: React.FC<Readonly<ReactTextLabel>> = (props) => {
	const className = props.className;

	const passedProps = props;
	const baseProps = getBaseProps<TextLabel>(passedProps);
	const textProps = getTextProps<TextLabel>(passedProps);
	deleteDefaultProps(passedProps);

	const baseEvents = baseProps.Event;
	const extraEvents = passedProps.Event;

	const totalEvents = {
		...baseEvents,
		...extraEvents,
	};

	return (
		<textlabel {...baseProps} {...textProps} {...passedProps} Event={totalEvents}>
			{props.children}
			<UiPadding className={className} />
			<UiCorner className={className} />
			<UiSizeConstraint className={className} />
			<UiListLayout className={className} />
		</textlabel>
	);
};

export default TextLabel;
