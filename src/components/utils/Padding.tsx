import React from "@rbxts/react";
import { getPaddingProps, paddingClassNamePattern, validatePaddingClassName } from "../../utils";

interface Props {
	className?: string;
}

const Padding: React.FC<Readonly<Props>> = ({ className = "" }) => {
	const matches = className.gmatch(paddingClassNamePattern)();
	if (matches.size() < 1) return;

	const props: Partial<Pick<UIPadding, "PaddingTop" | "PaddingRight" | "PaddingBottom" | "PaddingLeft">> = {};
	for (const match of matches) {
		if (typeIs(match, "string")) {
			const validated = validatePaddingClassName(match);
			getPaddingProps(validated, props);
		}
	}

	return <uipadding {...props} />;
};

export default Padding;
