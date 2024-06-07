import React from "react";
import { getSizeConstraintValues } from "../../utils";

interface Props {
	className?: string;
}

const SizeConstraint: React.FC<Readonly<Props>> = ({ className = "" }) => {
	const props = getSizeConstraintValues(className);
	if (!props) return;

	return <uisizeconstraint {...props} />;
};

export default SizeConstraint;
