import React from "react";
import { getMinMaxSizeValues } from "../../utils";

interface Props {
	className?: string;
}

const SizeConstraint: React.FC<Readonly<Props>> = ({ className = "" }) => {
	const sizes = getMinMaxSizeValues(className);
	if (!sizes) return;

	return <uisizeconstraint MaxSize={sizes.max} MinSize={sizes.min} />;
};

export default SizeConstraint;
