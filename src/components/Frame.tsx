import React, { FC } from "react";
import type { ReactFrame } from "../types/components";
import { getBaseProps } from "../utils";
import { Padding } from "./utils";

const Frame: FC<Readonly<ReactFrame>> = (props) => {
	const baseProps = getBaseProps<Frame>(props);

	return (
		<frame {...baseProps}>
			{props.children}
			<Padding className={props.className} />
		</frame>
	);
};

export default Frame;
