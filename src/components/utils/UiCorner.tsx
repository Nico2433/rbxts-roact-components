import React from "react";
import { getBorderRadiusValues } from "../../utils";

interface Props {
	className?: string;
}

const Rounded: React.FC<Readonly<Props>> = ({ className = "" }) => {
	const radius = getBorderRadiusValues(className);
	if (!radius) return;

	return <uicorner CornerRadius={radius} />;
};

export default Rounded;
