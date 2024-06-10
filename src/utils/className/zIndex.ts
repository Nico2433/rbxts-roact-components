import { ClassNameValues, getClassName, getClassNameProps, getClassNameValues } from "./core";

const zIndexPattern = "^z%-";

export const getZIndexValues = (className: string) => {
	const matches = getClassName(className, zIndexPattern);
	if (matches.isEmpty()) return;

	const props: Props = {};

	matches.forEach((match) => {
		const validated = getClassNameValues(match, { preventCalculate: true });
		getZIndexProps(validated, props);
	});

	return props;
};

interface Props {
	ZIndex?: number;
}

const getZIndexProps = (values: ClassNameValues, props: Props) =>
	getClassNameProps(values, ({ value }) => {
		props.ZIndex = value;
	});
