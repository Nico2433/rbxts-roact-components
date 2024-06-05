import React from "@rbxts/react";
import { getPaddingProps, paddingClassNamePattern, validatePaddingClassName } from "../../utils";

interface Props {
	className?: string;
}

const Padding: React.FC<Readonly<Props>> = ({ className = "" }) => {
	const matches = className.gmatch(paddingClassNamePattern);

	const props: Partial<Pick<UIPadding, "PaddingTop" | "PaddingRight" | "PaddingBottom" | "PaddingLeft">> = {};
	for (const match of matches) {
		const matchValue = match[0];
		if (typeIs(matchValue, "string")) {
			const validated = validatePaddingClassName(matchValue);
			getPaddingProps(validated, props);
		}
	}

	return <uipadding {...props} />;
};

export default Padding;
