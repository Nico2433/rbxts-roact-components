import React, { useEffect, useRef } from "react";
import { ReactInput } from "../types";
import { getBaseProps, getInputProps, getTextProps } from "../utils";
import { UiCorner, UiPadding, UiSizeConstraint } from "./utils";

const TextBox: React.FC<Readonly<ReactInput<TextBox>>> = (props) => {
	const baseProps = getBaseProps<TextBox>(props);
	const textProps = getTextProps<TextBox>(props);
	const inputProps = getInputProps<TextBox>(props);

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

	return (
		<textbox {...baseProps} {...textProps} {...inputProps}>
			{props.children}
			<UiPadding className={props.className} />
			<UiCorner className={props.className} />
			<UiSizeConstraint className={props.className} />
		</textbox>
	);
};

export default TextBox;
