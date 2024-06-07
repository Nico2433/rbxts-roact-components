import React from "react";
import type { ReactFrame } from "../types/components";
import { getBaseProps } from "../utils";
import { UiCorner, UiPadding, UiSizeConstraint } from "./utils";

const Frame: React.FC<Readonly<ReactFrame>> = (props) => {
	const baseProps = getBaseProps<Frame>(props);

	return (
		<frame {...baseProps}>
			{props.children}
			<UiPadding className={props.className} />
			<UiCorner className={props.className} />
			<UiSizeConstraint className={props.className} />
		</frame>
	);
};

export default Frame;
