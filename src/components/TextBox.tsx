import React, { useEffect, useRef } from "react";
import { ReactTextBox } from "../types";
import { deleteDefaultProps, getBaseProps, getTextProps } from "../utils";
import { UiCorner, UiListLayout, UiPadding, UiSizeConstraint } from "./utils";

const TextBox: React.FC<Readonly<ReactTextBox>> = (props) => {
	const className = props.className;

	const passedProps = props;
	const inputRef = passedProps.forwardRef ?? useRef<TextBox | undefined>(undefined);
	const onChange = passedProps.onChange;

	if (onChange) {
		useEffect(() => {
			const input = inputRef.current;
			if (input)
				input.GetPropertyChangedSignal("Text").Connect(() => {
					onChange(input);
				});
		}, []);
	}

	const baseProps = getBaseProps<TextBox>(passedProps, inputRef);
	const textProps = getTextProps<TextBox>(passedProps);
	deleteDefaultProps(passedProps);

	const baseEvents = baseProps.Event;
	const extraEvents = passedProps.Event;

	const totalEvents = {
		...baseEvents,
		...extraEvents,
	};

	return (
		<textbox {...baseProps} {...textProps} {...passedProps} Event={totalEvents}>
			{props.children}
			<UiPadding className={className} />
			<UiCorner className={className} />
			<UiSizeConstraint className={className} />
			<UiListLayout className={className} />
		</textbox>
	);
};

export default TextBox;
