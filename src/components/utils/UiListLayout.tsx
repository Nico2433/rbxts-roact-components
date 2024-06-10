import React from "react";
import { getFlexValues, getUiDisplayProps } from "../../utils";

interface Props {
	className?: string;
}

const UiListLayout: React.FC<Readonly<Props>> = ({ className = "" }) => {
	const flexProps = getFlexValues(className);
	if (!flexProps?.FillDirection) return;

	const displayProps = getUiDisplayProps(className, flexProps.FillDirection);

	return <uilistlayout {...flexProps} {...displayProps} />;
};

export default UiListLayout;
