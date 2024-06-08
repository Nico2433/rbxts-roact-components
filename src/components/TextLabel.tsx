import React from "react";
import { ReactTextLabel } from "../types";
import { getBaseProps, getTextProps } from "../utils";
import { UiCorner, UiPadding, UiSizeConstraint } from "./utils";

const TextLabel: React.FC<Readonly<ReactTextLabel>> = (props) => {
	const baseProps = getBaseProps<TextLabel>(props);
	const textProps = getTextProps<TextLabel>(props);

	return (
		<textlabel {...baseProps} {...textProps}>
			{props.children}
			<UiPadding className={props.className} />
			<UiCorner className={props.className} />
			<UiSizeConstraint className={props.className} />
		</textlabel>
	);
};

export default TextLabel;
