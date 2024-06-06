import React from "react";
import { getMinMaxSizeValues } from "../../utils";

interface Props {
	className?: string;
}

const SizeConstraint: React.FC<Readonly<Props>> = ({ className = "" }) => {
	const props = getMinMaxSizeValues(className);
	if (!props) return;

	return <uisizeconstraint {...props} />;
};

export default SizeConstraint;
