import React from "@rbxts/react";
import { getPaddingValues } from "../../utils";

interface Props {
	className?: string;
}

const Padding: React.FC<Readonly<Props>> = ({ className = "" }) => {
	const props = getPaddingValues(className);
	if (!props) return;

	return <uipadding {...props} />;
};

export default Padding;
