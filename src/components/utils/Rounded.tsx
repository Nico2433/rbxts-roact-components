import React from "react";
import { getRoundedValues } from "../../utils";

interface Props {
	className?: string;
}

const Rounded: React.FC<Readonly<Props>> = ({ className = "" }) => {
	const radius = getRoundedValues(className);
	if (!radius) return;

	return <uicorner CornerRadius={radius} />;
};

export default Rounded;
