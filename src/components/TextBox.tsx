import React, { useEffect, useRef } from "react";
import { ReactTextBox } from "../types";
import { getBaseProps, getTextProps } from "../utils";
import { UiCorner, UiListLayout, UiPadding, UiSizeConstraint } from "./utils";

const TextBox: React.FC<Readonly<ReactTextBox<TextBox>>> = (props) => {
	const inputRef = props.forwardRef ?? useRef<TextBox | undefined>(undefined);
	const onChange = props.onChange;

	if (onChange) {
		useEffect(() => {
			const input = inputRef.current;
			if (input)
				input.GetPropertyChangedSignal("Text").Connect(() => {
					onChange(input);
				});
		}, []);
	}

	const baseProps = getBaseProps<TextBox>(props, inputRef);
	const textProps = getTextProps<TextBox>(props);

	const baseEvents = baseProps.Event;
	const extraEvents = props.Event;

	const totalEvents = {
		...baseEvents,
		...extraEvents,
	};

	return (
		<textbox {...baseProps} {...textProps} {...props} Event={totalEvents}>
			{props.children}
			<UiPadding className={props.className} />
			<UiCorner className={props.className} />
			<UiSizeConstraint className={props.className} />
			<UiListLayout className={props.className} />
		</textbox>
	);
};

export default TextBox;
