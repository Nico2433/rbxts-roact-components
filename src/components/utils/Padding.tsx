import React from "@rbxts/react";
import { getPaddingProps, matchAllString, paddingClassNamePattern, validatePaddingClassName } from "../../utils";

interface Props {
	className?: string;
}

const Padding: React.FC<Readonly<Props>> = ({ className = "" }) => {
	const matches: string[] = matchAllString(className, paddingClassNamePattern);
	if (matches.isEmpty()) return;

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
