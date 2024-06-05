import React from "@rbxts/react";
import { getPaddingProps, paddingClassNamePattern, validatePaddingClassName } from "../../utils";

interface Props {
	className?: string;
}

const Padding: React.FC<Readonly<Props>> = ({ className = "" }) => {
	const matches: (string | number)[] = [];

	paddingClassNamePattern.forEach((pattern) => {
		const match = className.gmatch(pattern);

		let stop = 0;
		while (stop === 0) {
			const value = match()[0];
			if (value) {
				matches.push(value);
			} else {
				stop = 1;
			}
		}
	});

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
